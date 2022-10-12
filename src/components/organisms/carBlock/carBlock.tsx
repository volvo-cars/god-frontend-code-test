import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Block, Flex, Text } from 'vcc-ui'

import { useIsMobile } from '../../../hooks/useIsMobile'
import { CarType } from '../../../types/cars'
import { ChevronLink } from '../../molecules/chevronLink'
import { carBlockStyles } from './carBlock.styles'

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

  const styles = useMemo(
    () => carBlockStyles({ isHovered, isMobile }),
    [isHovered, isMobile]
  )

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      className='car-block'
      id={id}
    >
      <Link href={`/learn/${id}`}>
        <Flex style={styles.wrapper}>
          <Text
            variant='bates'
            subStyle='inline-link'
            tabIndex={-1}
            style={styles.bodyTypeText}
          >
            {bodyType}
          </Text>
          <Block style={styles.modelTextWrapper}>
            <Text
              subStyle='emphasis'
              tabIndex={-1}
              style={styles.modelNameText}
            >
              {modelName}
            </Text>
            <Text
              subStyle='inline-link'
              tabIndex={-1}
              style={styles.modelTypeText}
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
            style={styles.carImage}
            draggable='false'
          />
          <Flex style={styles.chevronWrapper}>
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
