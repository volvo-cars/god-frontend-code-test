import type { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { Block, SelectInput, Spinner } from 'vcc-ui'

import { fetchCars } from '../api/cars'
import {
  CarScrollerDesktopLazy,
  CarScrollerMobileLazy,
} from '../components/screens/carScroller'
import { useIsMobile } from '../hooks/useIsMobile'
import { indexStyles } from '../pageStyles/index.styles'
import { CarType } from '../types/cars'

const DEFAULT_FILTER = 'all'

type Props = {
  cars: CarType[]
  availableFilters: string[]
}
const Home: NextPage<Props> = ({ cars, availableFilters }) => {
  const [availableBodyTypes] = useState<string[]>([
    DEFAULT_FILTER,
    ...availableFilters.filter(
      (bodyType, index) => availableFilters.indexOf(bodyType) === index
    ),
  ])
  const [activeFilter, setActiveFilter] = useState<string>(DEFAULT_FILTER)

  const { isMobile } = useIsMobile()

  const filteredCars = useMemo(() => {
    if (activeFilter === DEFAULT_FILTER) {
      return cars
    }
    return cars.filter((car) => car.bodyType === activeFilter)
  }, [cars, activeFilter])

  const CarScroller = useMemo(
    () =>
      isMobile ? (
        <CarScrollerMobileLazy cars={filteredCars} />
      ) : (
        <CarScrollerDesktopLazy cars={filteredCars} />
      ),
    [isMobile, filteredCars]
  )

  return (
    <Block style={indexStyles.wrapper}>
      {availableBodyTypes.length !== 0 ? (
        <SelectInput
          label={'Body Types'}
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          style={indexStyles.filterInput}
        >
          {availableBodyTypes.map((bodyType) => (
            <option key={bodyType} value={bodyType}>
              {bodyType.toUpperCase()}
            </option>
          ))}
        </SelectInput>
      ) : null}
      {cars.length !== 0 ? CarScroller : <Spinner />}
    </Block>
  )
}

export async function getServerSideProps() {
  const cars = await fetchCars()
  return {
    props: {
      cars,
      availableFilters: cars.map((car) => car.bodyType),
    },
  }
}

export default Home
