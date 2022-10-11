import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Link } from 'vcc-ui'

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
      <Image src='/chevron-small.svg' width={15} height={15} alt='arrow' />
    </Link>
  )
}
