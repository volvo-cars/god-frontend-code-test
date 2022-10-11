import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Block, Flex } from 'vcc-ui'

import { CarType } from '../../../types/cars'
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
            <Block
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'black',
                margin: '0 9px',
                opacity: activeIndex === index ? 1 : 0.2,
                transition: 'opacity 0.3s',
              }}
              onClick={() => handleIndexClick(index)}
            />
          )
        })}
      </Flex>
    </>
  )
}
