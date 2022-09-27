import React from 'react';
import '../public/css/styles.css';
import { StyleProvider, ThemePicker } from 'vcc-ui';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ThemePicker variant='light'>
        <StyleProvider>
          <Component {...pageProps} />
        </StyleProvider>
      </ThemePicker>
    </React.StrictMode>
  );
}

export default App;
