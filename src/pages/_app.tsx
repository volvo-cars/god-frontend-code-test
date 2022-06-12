import React from "react";
import { AppProps } from "next/app";
import { StyleProvider, ThemePicker } from "vcc-ui";
import resetStyleRender from "@Utils/resetStyleRender";

export default function VolvoCarsApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <StyleProvider renderer={resetStyleRender}>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}
