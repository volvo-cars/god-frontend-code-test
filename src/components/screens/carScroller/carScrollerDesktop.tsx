import Image from 'next/image'
import { useRef, useState } from 'react'
import { Block, Flex } from 'vcc-ui'

import { CarType } from '../../../types/cars'
import { CAR_BLOCK_WIDTH_DESKTOP, CarBlock } from '../../organisms/carBlock'

type Props = {
  cars: CarType[]
}

export const CarScrollerDesktop = ({ cars }: Props) => {
  const [scrollIndex, setScrollIndex] = useState(1)

  const carWrapperRef = useRef<HTMLDivElement>(null)

  const handleScrollRight = () => {
    const element = carWrapperRef.current
    const offset = 15
    const carBlockSpace = CAR_BLOCK_WIDTH_DESKTOP - offset
    const nextRightScroll = carBlockSpace * scrollIndex
    if (!element || nextRightScroll !== element.scrollLeft + carBlockSpace) {
      return
    }
    if (nextRightScroll >= element.scrollWidth) {
      if (cars.length === scrollIndex) {
        element.scrollTo({
          left: element.scrollWidth,
          behavior: 'smooth',
        })
        setScrollIndex((oldIndex) => oldIndex + 1)
      }
      return
    }
    element.scrollTo({
      left: nextRightScroll,
      behavior: 'smooth',
    })
    setScrollIndex((oldIndex) => oldIndex + 1)
  }

  const handleScrollLeft = () => {
    const element = carWrapperRef.current
    const offset = 15
    const carBlockSpace = CAR_BLOCK_WIDTH_DESKTOP - offset
    const nextLeftScroll = carBlockSpace * (scrollIndex - 1) - carBlockSpace
    if (
      !element ||
      !(nextLeftScroll >= element.scrollLeft - (nextLeftScroll + carBlockSpace))
    ) {
      return
    }
    if (nextLeftScroll <= 0) {
      if (element.scrollLeft !== 0) {
        element.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
        setScrollIndex((oldIndex) => oldIndex - 1)
      }
      return
    }
    element.scrollTo({
      left: nextLeftScroll,
      behavior: 'smooth',
    })
    setScrollIndex((oldIndex) => oldIndex - 1)
  }

  return (
    <>
      <Flex
        ref={carWrapperRef}
        style={{
          flexDirection: 'row',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {cars.map((car) => (
          <CarBlock key={car.id} car={car} />
        ))}
      </Flex>
      <Block style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Image
          src='/chevron-circled.svg'
          width={40}
          height={40}
          style={{ transform: 'rotate(180deg)' }}
          alt='scroll-left'
          onClick={handleScrollLeft}
        />
        <Image
          src='/chevron-circled.svg'
          width={40}
          height={40}
          alt='scroll-right'
          onClick={handleScrollRight}
        />
      </Block>
    </>
  )
}
