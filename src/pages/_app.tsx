import React from 'react';
import type { AppProps } from 'next/app';
import { StyleProvider, ThemePicker } from 'vcc-ui';

import '../styles/global.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <Component {...pageProps} />
      </ThemePicker>
    </StyleProvider>
  );
}

export default App;
