import React from "react"
import type { AppProps } from 'next/app'
import {StyleProvider, ThemePicker} from "vcc-ui"
import "../public/css/styles.css"

function HomePage({Component, pageProps}: AppProps) {
	return (
		<StyleProvider>
			<ThemePicker variant='light'>
				<React.StrictMode>
					<Component {...pageProps} />
				</React.StrictMode>
			</ThemePicker>
		</StyleProvider>
	)
}

export default HomePage
