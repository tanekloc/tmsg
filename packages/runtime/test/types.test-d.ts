import { expectType, expectNotType } from 'tsd';
import { CreateArguments } from '../src/types.js';

declare function t<S extends string>(s: S): CreateArguments<S>;

expectType<[]>(t('Test'));
expectType<[]>(
  t(
    'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest',
  ),
);
expectType<[]>(
  t(
    'Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test ',
  ),
);
expectType<[Record<'test', string | number | boolean | Date>]>(
  t(
    'Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test {%test} Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test Test test ',
  ),
);

expectType<[Record<'TEST', string | number | boolean | Date>]>(t('{%TEST}'));
expectNotType<[]>(t('{%TEST}'));

expectType<[Record<'name', string | number | boolean | Date>]>(
  t('Hello, {%name}!'),
);
expectNotType<[]>(t('Hello, {%name}!'));
expectNotType<[{ count: number }]>(t('Hello, {%name}!'));

expectType<[Record<'count', string | number | boolean | Date>]>(
  t('You have {%count, plural, one {# item} other {# items}} in your cart.'),
);
expectNotType<[]>(
  t('You have {%count, plural, one {# item} other {# items}} in your cart.'),
);
expectNotType<[Record<'name', string | number | boolean | Date>]>(
  t('You have {%count, plural, one {# item} other {# items}} in your cart.'),
);

expectType<[Record<'balance', string | number | boolean | Date>]>(
  t('You have a balance of {%balance, number, USD} in your account.'),
);
expectNotType<[]>(
  t('You have a balance of {%balance, number, USD} in your account.'),
);
expectNotType<[Record<'count', string | number | boolean | Date>]>(
  t('You have a balance of {%balance, number, USD} in your account.'),
);
