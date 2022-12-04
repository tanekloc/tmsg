type Delimieters = [' ', '\n', '\t', '{', '}', ',', '.'];

type TokenizeTmsgFormat<Message extends string> = SplitByDelimiters<
  Message,
  Delimieters
>;

type Params<S extends string> = Filter<TokenizeTmsgFormat<S>>;

type HasParams<S extends string> = Params<S> extends [] ? never : true;

type ArrayToUnion<Array extends Readonly<string[]>> = Array[number];

type RecordParams<S extends string> = Record<
  ArrayToUnion<Params<S>>,
  string | number | boolean | Date
>;

type Split<
  T extends string,
  D extends string,
  Acc extends string[] = [],
> = T extends `${infer A}${D}${infer B}`
  ? A extends ''
    ? Split<B, D, Acc>
    : Split<B, D, [...Acc, A]>
  : T extends ''
  ? Acc
  : [...Acc, T];

type SplitByDelimiters<T extends string, D extends string[]> = D extends [
  infer H extends string,
  ...infer Tail extends string[],
]
  ? T extends ''
    ? []
    : SplitManyByDelimiters<[...Split<T, H>], Tail>
  : [T];

type SplitMany<
  T extends string[],
  D extends string,
  Acc extends string[] = [],
> = T extends [infer H extends string, ...infer Tail extends string[]]
  ? SplitMany<Tail, D, [...Acc, ...Split<H, D>]>
  : Acc;

type SplitManyByDelimiters<T extends string[], D extends string[]> = D extends [
  infer H extends string,
  ...infer Tail extends string[],
]
  ? SplitManyByDelimiters<[...SplitMany<T, H>], Tail>
  : T;

export type Filter<Input extends readonly unknown[]> = Input extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends `\\%${infer Name}`
    ? Filter<Tail>
    : Head extends `%${infer Name}`
    ? [Name, ...Filter<Tail>]
    : Filter<Tail>
  : [];

export type CreateArguments<S extends string> = true extends HasParams<S>
  ? [RecordParams<S>]
  : [];
