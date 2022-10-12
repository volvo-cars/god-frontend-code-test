import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { Block, SelectInput, Spinner } from 'vcc-ui'

import { fetchCars } from '../api/cars'
import { useIsMobile } from '../hooks/useIsMobile'
import { CarType } from '../types/cars'

const CarScrollerDesktop = dynamic(
  () =>
    import('../components/screens/carScroller/carScrollerDesktop').then(
      (mod) => mod.CarScrollerDesktop
    ),
  {
    ssr: false,
  }
)
const CarScrollerMobile = dynamic(
  () =>
    import('../components/screens/carScroller/carScrollerMobile').then(
      (mod) => mod.CarScrollerMobile
    ),
  {
    ssr: false,
  }
)
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
        <CarScrollerMobile cars={filteredCars} />
      ) : (
        <CarScrollerDesktop cars={filteredCars} />
      ),
    [isMobile, filteredCars]
  )

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
      {availableBodyTypes.length !== 0 ? (
        <SelectInput
          label={'Body Types'}
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          style={{ marginBottom: 15 }}
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
