import { HelloWorld } from '../src/components/HelloWorld'

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
        <>
            <HelloWorld />
            { JSON.stringify(cars) }
        </>
    )
}

export default HomePage
