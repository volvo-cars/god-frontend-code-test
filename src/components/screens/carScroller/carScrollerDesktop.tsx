import Image from 'next/image'
import { MouseEvent, useRef, useState } from 'react'
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

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: MouseEvent<HTMLDivElement>) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.clientX)
  }

  const onTouchMove = (e: MouseEvent<HTMLDivElement>) => {
    setTouchEnd(e.clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    // @todo better logic for detecting longer or faster swipe distances
    if (isLeftSwipe) {
      handleScrollRight()
    } else if (isRightSwipe) {
      handleScrollLeft()
    }
  }

  return (
    <>
      <Flex
        ref={carWrapperRef}
        style={{
          flexDirection: 'row',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          margin: '0 auto',
          width: 385 * Math.floor(window.innerWidth / 385),
        }}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
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
