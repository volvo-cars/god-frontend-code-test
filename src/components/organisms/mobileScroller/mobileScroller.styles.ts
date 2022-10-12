import { CSSProperties } from 'react'

export const mobileScrollerStyles: { [key: string]: CSSProperties } = {
  wrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  indexBlockWrapper: {
    margin: '0 auto',
    flexDirection: 'row',
  },
}
