import React from 'react'

import { CarType } from '../../../types/cars'
import { CarBlock } from '../../organisms/carBlock'
import { DesktopScroller } from '../../organisms/desktopScroller'

type Props = {
  cars: CarType[]
}

export const CarScrollerDesktop = ({ cars }: Props) => {
  return (
    <>
      <DesktopScroller itemBlockSpace={386}>
        {cars.map((car) => (
          <CarBlock key={car.id} car={car} />
        ))}
      </DesktopScroller>
    </>
  )
}
