import React, { CSSProperties } from 'react'

type Props = {
  style?: CSSProperties
}

export const ChevronSmall = ({ style }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11' style={style}>
      <path
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M2 1.5l4 4-4 4'
      ></path>
    </svg>
  )
}
