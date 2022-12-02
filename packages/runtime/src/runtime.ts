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
