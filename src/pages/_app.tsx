import type { AppProps } from 'next/app'
import { StyleProvider, ThemePicker } from 'vcc-ui'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider>
      <ThemePicker>
        <Component {...pageProps} />
      </ThemePicker>
    </StyleProvider>
  )
}

export default MyApp
