import { useRouter } from 'next/router'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'vcc-ui'

import { ChevronSmall } from '../../../svg/chevron-small'
import { chevronLinkStyles } from './chevronLink.styles'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  href: string
  external?: boolean
}

export const ChevronLink = ({
  children,
  href,
  external = false,
  ...rest
}: Props) => {
  const { push } = useRouter()

  const navigationProp = external ? { href } : { onClick: () => push(href) }
  return (
    <Link style={chevronLinkStyles.wrapper} {...rest} {...navigationProp}>
      {children}
      <ChevronSmall style={chevronLinkStyles.chevron} />
    </Link>
  )
}
