const getCar: (id: string) => Promise<ICar | undefined> = async (id: string) => {
    const res: Response = await fetch(process.env.DATA_URL + '/api/cars.json')

    if (!res.ok) {
        return undefined
    }

    const cars: ICar[] = await res.json()
    const car = cars.find(car => car.id === id)

    return car
}

interface ILearnPage {
    params: {
        id: string
    }
}

const LearnPage = async ({ params }: ILearnPage) => {
    const { id } = params

    const car = await getCar(id)
    
    return (
        <>
            <h1>{ id }</h1>
            {car ? JSON.stringify(car) : 'That car id does not exist.'}
        </>
    )
}

export default LearnPage
