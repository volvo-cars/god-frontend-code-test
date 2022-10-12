import { CSSProperties } from 'react'

import { COLORS } from '../../../constants/colors'
import { CAR_BLOCK_WIDTH_DESKTOP, CAR_BLOCK_WIDTH_MOBILE } from './carBlock'

export const carBlockStyles: (values: {
  isMobile: boolean
  isHovered: boolean
}) => { [key: string]: CSSProperties } = ({ isMobile, isHovered }) => ({
  wrapper: {
    position: 'relative',
    width: isMobile ? CAR_BLOCK_WIDTH_MOBILE : CAR_BLOCK_WIDTH_DESKTOP,
    height: isMobile ? 350 : 400,
    margin: 18,
    cursor: 'pointer',
    userSelect: 'none',
  },
  bodyTypeText: {
    textTransform: 'uppercase',
    fontWeight: 500,
    color: isHovered ? COLORS.volvoBlue : 'inherit',
    transition: 'color 0.3s',
  },
  modelTextWrapper: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    marginTop: 3,
    marginBottom: 15,
  },
  modelNameText: {
    color: isHovered ? COLORS.volvoBlue : 'inherit',
    transition: 'color 0.3s',
  },
  modelTypeText: {
    marginLeft: isMobile ? 0 : '4px',
    color: isHovered ? COLORS.volvoBlue : 'inherit',
    transition: 'color 0.3s',
  },
  carImage: {
    marginTop: 6,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.3s',
  },
  chevronWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
})
