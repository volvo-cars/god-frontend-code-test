import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Block, Flex, SelectInput } from 'vcc-ui'

import { CarBlock } from '../components/organisms/carBlock'
import { CarType } from '../types/cars'

const Home: NextPage = () => {
  const [cars, setCars] = useState<CarType[]>([])
  const [availableBodyTypes, setAvailableBodyTypes] = useState<string[]>([])
  const [filter, setFilter] = useState('all')
  const [scrollIndex, setScrollIndex] = useState(1)

  const carWrapperRef = useRef<HTMLDivElement>(null)

  // $0.scrollTo({left: 300, behavior: 'smooth'})

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

  useEffect(() => {
    const handleFetch = async () => {
      const cars = (await axios<CarType[]>('http://localhost:3000/api/cars'))
        .data
      if (cars.length !== 0) {
        setCars(cars)
        const carBodyTypes = cars.map((car) => car.bodyType)
        setAvailableBodyTypes([
          'all',
          ...carBodyTypes.filter(
            (bodyType, index) => carBodyTypes.indexOf(bodyType) === index
          ),
        ])
      }
    }
    handleFetch()
  }, [])

  const filteredCars = useMemo(() => {
    if (filter === 'all') {
      return cars
    }
    return cars.filter((car) => car.bodyType === filter)
  }, [cars, filter])

  return (
    <Block
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <SelectInput
        label={'Body Types'}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {availableBodyTypes.map((bodyType) => (
          <option key={bodyType} value={bodyType}>
            {bodyType.toUpperCase()}
          </option>
        ))}
      </SelectInput>
      <Flex
        ref={carWrapperRef}
        style={{
          flexDirection: 'row',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {filteredCars.map((car) => (
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
    </Block>
  )
}

export default Home
