import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { configure } from '@tmsg/runtime';

const i18n = configure({
  locales: ['en', 'de'],
  rootURL: new URL('/locales/', window.location.origin),
});

type T = Awaited<ReturnType<typeof i18n.buildT>>;

function GetLocale(locale: string): T | null {
  const [configuration, setConfiguration] = useState<{ t: T }>();

  useEffect(() => {
    i18n.buildT(locale).then((tFunction) => {
      setConfiguration({
        t: tFunction,
      });
    });
  }, [locale]);

  if (!configuration) {
    return null;
  }

  return configuration.t;
}

function App() {
  const [locale, setLocale] = useState('en');
  const t = GetLocale(locale);

  if (!t) {
    return <>Loading</>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {t('Edit {%code} and save to reload.', {
            code: 'src/App.tsx',
          })}
        </p>
        <button onClick={() => setLocale('de')}>German</button>
        <button onClick={() => setLocale('en')}>English</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
