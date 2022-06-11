import React from "react";
import { AppProps } from "next/app";
import { styleRenderer, StyleProvider, ThemePicker } from "vcc-ui";

const renderer = styleRenderer();

renderer.renderStatic(
  {
    margin: 0,
    padding: 0,
    backgroundColor: "white",
  },
  "body"
);

export default function VolvoCarsApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <StyleProvider renderer={renderer}>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}
