import { useMemo } from 'react'
import { Block } from 'vcc-ui'

import { indexBlockStyles } from './indexBlock.styles'

type Props = {
  isActive: boolean
  onClick: () => void
}

export const IndexBlock = ({ isActive, onClick }: Props) => {
  const styles = useMemo(() => indexBlockStyles({ isActive }), [isActive])
  return <Block style={styles.block} onClick={onClick} />
}
