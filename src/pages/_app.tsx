import React from 'react';
import type { AppProps } from 'next/app';
import NextLink from 'next/link';
import { ConfigProvider, Link, StyleProvider, ThemePicker } from 'vcc-ui';

import '../styles/global.scss';

type LinkProps = React.ComponentProps<typeof Link>;
const config = {
  linkComponent: ({ children, href, ...linkProps }: LinkProps) => {
    // we only want to use next/link for internal links
    // external links are better served with an basic a tag
    if (typeof href === 'object' || href?.indexOf('/') === 0) {
      return (
        <NextLink href={href}>
          <a {...linkProps}>{children}</a>
        </NextLink>
      );
    }

    return (
      <a href={href} {...linkProps}>
        {children}
      </a>
    );
  },
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider config={config}>
      <StyleProvider>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
