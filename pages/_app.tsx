import { Block, Logo, StyleProvider, ThemePicker, View } from "vcc-ui";
import "../public/css/styles.css";
import type { AppProps } from "next/app";

import React, { StrictMode } from "react";
import reportAccessibility from "../src/util/reportAccessibility";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StyleProvider>
        <ThemePicker variant="light">
          <StrictMode>
            <Block
              extend={{
                padding: 20,
              }}
            >
              <View padding={6}>
                <Logo height={32} />
              </View>

              <Component {...pageProps} />
            </Block>
          </StrictMode>
        </ThemePicker>
      </StyleProvider>
    </>
  );
}

reportAccessibility(React);
export default App;
