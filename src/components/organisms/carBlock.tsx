import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Block, Flex, Text } from 'vcc-ui'

import { COLORS } from '../../constants/colors'
import { useIsMobile } from '../../hooks/useIsMobile'
import { CarType } from '../../types/cars'
import { ChevronLink } from '../molecules/chevronLink'

export const CAR_BLOCK_WIDTH_DESKTOP = 350
export const CAR_BLOCK_WIDTH_MOBILE = 300

type Props = {
  car: CarType
}

export const CarBlock = ({
  car: { id, imageUrl, modelName, modelType, bodyType },
}: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  const { isMobile } = useIsMobile()

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      className='car-block'
      id={id}
    >
      <Link href={`/learn/${id}`}>
        <Flex
          style={{
            position: 'relative',
            width: isMobile ? CAR_BLOCK_WIDTH_MOBILE : CAR_BLOCK_WIDTH_DESKTOP,
            height: isMobile ? 350 : 400,
            margin: 18,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <Text
            variant='bates'
            subStyle='inline-link'
            tabIndex={-1}
            style={{
              textTransform: 'uppercase',
              fontWeight: 500,
              color: isHovered ? COLORS.volvoBlue : 'inherit',
              transition: 'color 0.3s',
            }}
          >
            {bodyType}
          </Text>
          <Block
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              marginTop: 3,
              marginBottom: 15,
            }}
          >
            <Text
              subStyle='emphasis'
              tabIndex={-1}
              style={{
                color: isHovered ? COLORS.volvoBlue : 'inherit',
                transition: 'color 0.3s',
              }}
            >
              {modelName}
            </Text>
            <Text
              subStyle='inline-link'
              tabIndex={-1}
              style={{
                marginLeft: isMobile ? 0 : '4px',
                color: isHovered ? COLORS.volvoBlue : 'inherit',
                transition: 'color 0.3s',
              }}
            >
              {modelType}
            </Text>
          </Block>
          <Image
            src={imageUrl}
            width={isMobile ? CAR_BLOCK_WIDTH_MOBILE : CAR_BLOCK_WIDTH_DESKTOP}
            height={isMobile ? 250 : 300}
            layout='fixed'
            alt={`${modelName}-image`}
            priority
            style={{
              marginTop: 6,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s',
            }}
            draggable='false'
          />
          <Flex
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 15,
            }}
          >
            <ChevronLink tabIndex={0} href={`/learn/${id}`}>
              Learn
            </ChevronLink>
            <ChevronLink tabIndex={0} href={`/shop/${id}`}>
              Shop
            </ChevronLink>
          </Flex>
        </Flex>
      </Link>
    </div>
  )
}
