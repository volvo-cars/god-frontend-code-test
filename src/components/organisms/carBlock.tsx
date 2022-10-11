import Image from 'next/image'
import { Block, Flex, Text } from 'vcc-ui'

import { useIsMobile } from '../../hooks/useIsMobile'
import { CarType } from '../../types/cars'
import { ChevronLink } from '../molecules/chevronLink'

export const CAR_BLOCK_WIDTH_MOBILE = 300

type Props = {
  car: CarType
}

export const CarBlock = ({
  car: { id, imageUrl, modelName, modelType, bodyType },
}: Props) => {
  const { isMobile } = useIsMobile()

  return (
    <Flex
      style={{
        position: 'relative',
        width: isMobile ? CAR_BLOCK_WIDTH_MOBILE : 400,
        height: isMobile ? 300 : 400,
        margin: 18,
      }}
    >
      <Text subStyle='inline-link' style={{ textTransform: 'uppercase' }}>
        {bodyType}
      </Text>
      <Block style={{ display: 'flex', marginTop: 3, marginBottom: 15 }}>
        <Text subStyle='emphasis'>{modelName}</Text>
        <Text subStyle='inline-link' style={{ marginLeft: '4px' }}>
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
  )
}
