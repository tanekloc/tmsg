import express from 'express';
import { configure } from '@tmsg/runtime';
import { pathToFileURL } from 'url';

const app = express();

const i18n = configure({
  locales: ['en', 'de'],
  rootURL: pathToFileURL(process.cwd() + '/dist/locales/'),
});

app.get('/', async (req, res) => {
  const t = await i18n.buildT('de');
  res.send(
    t('Hello world {%url}!', {
      url: 'https://example.com',
    }),
  );
});

app.listen(8080, () => {
  console.log(`server started at http://localhost:8080`);
});
