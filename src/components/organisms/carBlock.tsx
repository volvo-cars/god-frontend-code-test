import Image from 'next/image'
import Link from 'next/link'
import { Block, Flex, Text } from 'vcc-ui'

import { useIsMobile } from '../../hooks/useIsMobile'
import { CarType } from '../../types/cars'
import { ChevronLink } from '../molecules/chevronLink'

export const CAR_BLOCK_WIDTH_MOBILE = 300
export const CAR_BLOCK_WIDTH_DESKTOP = 400

type Props = {
  car: CarType
}

export const CarBlock = ({
  car: { id, imageUrl, modelName, modelType, bodyType },
}: Props) => {
  const { isMobile } = useIsMobile()

  return (
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
          style={{ textTransform: 'uppercase', fontWeight: 500 }}
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
          <Text subStyle='emphasis'>{modelName}</Text>
          <Text
            subStyle='inline-link'
            style={{ marginLeft: isMobile ? 0 : '4px' }}
          >
            {modelType}
          </Text>
        </Block>
        <Image
          src={imageUrl}
          width={isMobile ? 300 : 350}
          height={isMobile ? 250 : 300}
          layout='fixed'
          alt={`${modelName}-image`}
          style={{ marginTop: 6 }}
          draggable='false'
        />
        <Flex
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 15,
          }}
        >
          <ChevronLink href={`/learn/${id}`}>Learn</ChevronLink>
          <ChevronLink href={`/shop/${id}`}>Shop</ChevronLink>
        </Flex>
      </Flex>
    </Link>
  )
}
