import Image from 'next/image'
import { useRef, useState } from 'react'
import { Block, Flex } from 'vcc-ui'

import { CarType } from '../../../types/cars'
import { CarBlock } from '../../organisms/carBlock'

type Props = {
  cars: CarType[]
}

export const CarScrollerDesktop = ({ cars }: Props) => {
  const [scrollIndex, setScrollIndex] = useState(1)

  const carWrapperRef = useRef<HTMLDivElement>(null)

  const handleScrollRight = () => {
    const element = carWrapperRef.current
    const nextRightScroll = window.innerWidth * scrollIndex
    if (
      !element ||
      nextRightScroll !== element.scrollLeft + window.innerWidth
    ) {
      return
    }
    if (nextRightScroll >= element.scrollWidth) {
      if (element.scrollLeft + window.innerWidth !== element.scrollWidth) {
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
    const nextLeftScroll =
      window.innerWidth * (scrollIndex - 1) - window.innerWidth
    if (
      !element ||
      !(
        nextLeftScroll >=
        element.scrollLeft - (nextLeftScroll + window.innerWidth)
      )
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
