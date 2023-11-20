import { ReactNode } from 'react'
import '@volvo-cars/css/font-face.css'
import '@volvo-cars/css/tokens.css'
import '@volvo-cars/css/styles_all-media.css'
import '../public/css/styles.css'
import Footer from '../src/components/Footer'

interface IRootLayout {
    children: ReactNode
}

const RootLayout = ({ children }: IRootLayout) => {
    return (
        <html lang='en'>
            <body className='volvo_v0'>
                { children }
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout
