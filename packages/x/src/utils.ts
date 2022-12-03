import path from 'path';

export function normalizePath(p: string): string {
  return path.normalize(path.isAbsolute(p) ? p : path.join(process.cwd(), p));
}
