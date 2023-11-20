import HomePageContainer from '../src/components/HomePageContainer'

const getCars: () => Promise<ICar[]> = async () => {
    const res: Response = await fetch(process.env.DATA_URL + '/api/cars.json')

    if (!res.ok) {
        return []
    }

    const cars: ICar[] = await res.json()

    return cars
}

const HomePage = async () => {
    const cars = await getCars()

    return (
        <HomePageContainer cars={cars} />
    )
}

export default HomePage
