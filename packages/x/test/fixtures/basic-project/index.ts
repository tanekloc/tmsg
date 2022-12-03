const t = (string: string, params: any) => {};

console.log(
  t('Hello world {%url}!', {
    url: 'https://example.com',
  }),
);
