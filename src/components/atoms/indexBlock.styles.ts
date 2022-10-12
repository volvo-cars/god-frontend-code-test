import { CSSProperties } from 'react'

export const indexBlockStyles: (values: { isActive: boolean }) => {
  [key: string]: CSSProperties
} = ({ isActive }) => ({
  block: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'black',
    margin: '0 9px',
    opacity: isActive ? 1 : 0.2,
    transition: 'opacity 0.3s',
  },
})
