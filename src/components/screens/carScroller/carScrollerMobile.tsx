import { useCallback, useLayoutEffect, useRef, useState } from 'react'
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

  const updateIndex = useCallback(() => {
    const element = carWrapperRef.current
    if (!element) {
      return
    }
    const currentIndex = Math.floor(element.scrollLeft / CAR_BLOCK_WIDTH_MOBILE)
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex)
    }
  }, [activeIndex])

  useLayoutEffect(() => {
    const element = carWrapperRef.current
    if (!element) {
      return
    }
    element.addEventListener('scroll', updateIndex)
    return () => element.removeEventListener('scroll', updateIndex)
  }, [updateIndex])

  return (
    <>
      <Flex
        ref={carWrapperRef}
        style={{
          flexDirection: 'row',
          overflow: 'auto',
          whiteSpace: 'nowrap',
        }}
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
