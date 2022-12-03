import type { CreateTArgs } from './types.js';

export type Locale = string;
export type MessageKey = string;
export type CompiledString = (args: Record<string, any>) => string;
export type CompiledStrings = Record<MessageKey, CompiledString | undefined>;

export class Runtime {
  #rootURL: URL;

  constructor(rootURL: URL) {
    this.#rootURL = rootURL;
  }

  async load(locale: Locale): Promise<CompiledStrings> {
    const localePath = new URL(`./${locale}/${locale}.js`, this.#rootURL);
    return (await import(localePath.href)).default;
  }
}

export function configure(options: { locales: Locale[]; rootURL: URL }) {
  const storage = new Runtime(options.rootURL);
  return {
    buildT: async (locale: Locale) => {
      const strings = await storage.load(locale);
      function t<S extends string>(
        message: S,
        ...params: CreateTArgs<S>
      ): string;
      function t(message: string, params?: Record<string, any>): string {
        const s = strings[message];
        if (!s) {
          throw new Error(
            `String "${message}" is not found in locale ${locale}.`,
          );
        }
        return s(params || {});
      }
      return t;
    },
  };
}
