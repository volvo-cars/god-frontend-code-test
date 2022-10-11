import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { Block, SelectInput } from 'vcc-ui'

import { CarScrollerDesktop } from '../components/screens/carScroller/carScrollerDesktop'
import { CarScrollerMobile } from '../components/screens/carScroller/carScrollerMobile'
import { useIsMobile } from '../hooks/useIsMobile'
import { CarType } from '../types/cars'

const Home: NextPage = () => {
  const [cars, setCars] = useState<CarType[]>([])
  const [availableBodyTypes, setAvailableBodyTypes] = useState<string[]>([])
  const [filter, setFilter] = useState('all')

  const { isMobile } = useIsMobile()

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
      {isMobile ? (
        <CarScrollerMobile cars={filteredCars} />
      ) : (
        <CarScrollerDesktop cars={filteredCars} />
      )}
    </Block>
  )
}

export default Home
