import { CSSProperties } from 'react'

export const desktopScrollerStyles: (values: {
  itemBlockSpace: number
  itemsInViewport: number
  disableScrollLeft: boolean
  disableScrollRight: boolean
}) => { [key: string]: CSSProperties } = ({
  itemBlockSpace,
  itemsInViewport,
  disableScrollLeft,
  disableScrollRight,
}) => ({
  wrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    margin: '0 auto',
    width: itemBlockSpace * itemsInViewport,
  },
  chevronWrapper: { position: 'absolute', bottom: 20, right: 20 },
  chevronLeft: {
    transform: 'rotate(180deg)',
    cursor: 'pointer',
    opacity: disableScrollLeft ? 0.6 : 1,
  },
  chevronRight: { cursor: 'pointer', opacity: disableScrollRight ? 0.6 : 1 },
})
