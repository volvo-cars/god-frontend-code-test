"use client"

import { useEffect, useState } from 'react'
import Carousel from '../../src/components/Carousel'
import NavigationBar from '../../src/components/NavigationBar'

interface IHomePageContainer {
    cars: ICar[]
}

const HomePageContainer = ({ cars }: IHomePageContainer) => {
    const [filteredBodyType, setFilteredBodyType] = useState('')
    const [filteredCars, setFilteredCars] = useState<ICar[]>([])

    useEffect(() => {
        if (filteredBodyType) {
            setFilteredCars(cars.filter(car => car.bodyType === filteredBodyType))
        } else {
            setFilteredCars(cars)
        }
    }, [cars, filteredBodyType])

    return (
        <>
            <NavigationBar cars={cars} filteredBodyType={filteredBodyType} setFilteredBodyType={setFilteredBodyType} />
            <Carousel cars={filteredCars} />
        </>
    )
}

export default HomePageContainer
