import ts from 'typescript';
import fs from 'fs';
import path from 'path';

import { normalizePath } from './utils.js';

export function extract(outDir: string, projectDir: string, locales: string[]) {
  projectDir = normalizePath(projectDir);
  outDir = normalizePath(outDir);
  const messages = getMessages(projectDir);

  for (const locale of locales) {
    const targetFile = path.join(outDir, `${locale}.json`);
    let existingMessages: Record<string, string> = {};
    if (fs.existsSync(targetFile)) {
      existingMessages = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));
    }
    existingMessages = mergeMessages(existingMessages, messages);
    fs.writeFileSync(targetFile, JSON.stringify(messages, null, 2));
  }
}

export function mergeMessages(
  existingMessages: Record<string, string>,
  extractedMessages: Record<string, string>,
): Record<string, string> {
  const existingKeys = new Set(Object.keys(existingMessages));
  const extractedKeys = new Set(Object.keys(extractedMessages));

  for (const existingKey of existingKeys) {
    if (!extractedKeys.has(existingKey)) {
      delete existingMessages[existingKey];
    }
  }

  for (const extractedKey of extractedKeys) {
    if (!existingKeys.has(extractedKey)) {
      existingMessages[extractedKey] = extractedMessages[extractedKey];
    }
  }

  return existingMessages;
}

function asMessageFormat(message: string, keys: string[]) {
  for (const param of keys) {
    message = message.replaceAll('%' + param, param);
  }
  return message;
}

function getMessages(projectDir: string): Record<string, string> {
  const configPath = ts.findConfigFile(projectDir, ts.sys.fileExists);
  if (!configPath) {
    throw new Error('tsconfig not found');
  }
  const result = ts.readConfigFile(configPath, ts.sys.readFile);

  if (!result.config) {
    throw new Error('tsconfig cannot be parsed ' + result.error);
  }
  const configJSON = result.config;

  const { options, errors } = ts.convertCompilerOptionsFromJson(
    configJSON.compilerOptions,
    configJSON.basePath,
  );

  if (errors.length) {
    throw new Error(errors.map((err) => err.messageText).join('\n'));
  }

  const host = ts.createCompilerHost(options, true);

  const parsedOptions = ts.parseJsonConfigFileContent(
    configJSON,
    ts.sys,
    projectDir,
  );

  const program = ts.createProgram({
    rootNames: parsedOptions.fileNames,
    options,
    host,
  });

  const messages: Record<string, string> = {};

  for (const file of program.getSourceFiles()) {
    if (!file.isDeclarationFile) walkFile(file, messages);
  }

  return messages;
}

function walkFile(sourceFile: ts.SourceFile, messages: Record<string, string>) {
  handleNode(sourceFile);

  function handleNode(node: ts.Node) {
    if (isTFunction(node)) {
      const args = node.arguments;
      const message = args[0];
      if (!ts.isStringLiteralLike(message)) {
        throw new Error('Wrong 1st arg');
      }
      const literalNames = [];
      if (args.length === 2) {
        const props = args[1];
        if (!ts.isObjectLiteralExpression(props)) {
          throw new Error('Properties must be an object literal');
        }
        for (const prop of props.properties) {
          if (!prop.name) {
            throw new Error('Properties need to have a name');
          }
          literalNames.push((prop.name as ts.Identifier).text);
        }
      }
      messages[message.text] = asMessageFormat(message.text, literalNames);
    }
    ts.forEachChild(node, handleNode);
  }
}

function isTFunction(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) {
    return false;
  }

  const fnName = (node.expression as ts.Identifier).text;

  if (fnName !== 't') {
    return false;
  }

  const args = node.arguments;

  if (args.length === 0 || args.length > 2) {
    return false;
  }

  return true;
}
