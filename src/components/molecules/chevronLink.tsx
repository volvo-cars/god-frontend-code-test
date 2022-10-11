import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Block, Link } from 'vcc-ui'

type Props = {
  children: ReactNode
  href: string
  external?: boolean
}

export const ChevronLink = ({ children, href, external = false }: Props) => {
  const { push } = useRouter()

  const navigationProp = external ? { href } : { onClick: () => push(href) }
  return (
    <Link style={{ display: 'flex', alignItems: 'center' }} {...navigationProp}>
      {children}
      <Block style={{ marginLeft: 7, display: 'flex', alignItems: 'center' }}>
        <Image src='/chevron-small.svg' width={15} height={15} alt='arrow' />
      </Block>
    </Link>
  )
}
