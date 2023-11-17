import { ReactNode } from 'react'

interface IRootLayout {
    children: ReactNode
}

const RootLayout = ({ children }: IRootLayout) => {
    return (
        <html lang='en'>
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout
