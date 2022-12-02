type Delimieters = [' ', '\n', '\t', '{', '}'];

type TokenizeTmsgFormat<Message extends string> = SplitByDelimiters<
  Message,
  Delimieters
>;

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

export type Params<S extends string> = Filter<TokenizeTmsgFormat<S>>;

export type HasParams<S extends string> = Params<S> extends [] ? never : true;

export type ArrayToUnion<Array extends Readonly<string[]>> = Array[number];

export type RecordParams<S extends string> = Record<
  ArrayToUnion<Params<S>>,
  string | number | boolean | Date
>;

export type CreateTArgs<S extends string> = true extends HasParams<S>
  ? [RecordParams<S>]
  : [];

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
