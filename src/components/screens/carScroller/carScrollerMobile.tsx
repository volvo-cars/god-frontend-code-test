import { TouchEvent, useRef, useState } from 'react'
import { Flex } from 'vcc-ui'

import { CarType } from '../../../types/cars'
import { IndexBlock } from '../../atoms/indexBlock'
import { CAR_BLOCK_WIDTH_MOBILE, CarBlock } from '../../organisms/carBlock'

type Props = {
  cars: CarType[]
}

export const CarScrollerMobile = ({ cars }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const carWrapperRef = useRef<HTMLDivElement>(null)

  const handleIndexClick = (index: number) => {
    if (index >= cars.length || index < 0) {
      return
    }

    setActiveIndex(index)

    const element = carWrapperRef.current
    if (!element) {
      return
    }
    const offset = 35
    element.scrollTo({
      left: index * (CAR_BLOCK_WIDTH_MOBILE + offset),
      behavior: 'smooth',
    })
  }

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 0

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // @todo better logic for detecting longer or faster swipe distances
    if (isLeftSwipe || isRightSwipe) {
      handleIndexClick(isLeftSwipe ? activeIndex + 1 : activeIndex - 1)
    } else {
      handleIndexClick(activeIndex)
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
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {cars.map((car) => (
          <CarBlock key={car.id} car={car} />
        ))}
      </Flex>
      <Flex
        style={{
          margin: '0 auto',
          flexDirection: 'row',
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {Array.from({ length: cars.length }).map((_, index) => {
          return (
            <IndexBlock
              key={index}
              isActive={activeIndex === index}
              onClick={() => handleIndexClick(index)}
            />
          )
        })}
      </Flex>
    </>
  )
}
