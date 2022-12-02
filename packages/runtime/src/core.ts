import { Locale, Runtime } from './runtime.js';
import type { CreateTArgs } from './types.js';

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
