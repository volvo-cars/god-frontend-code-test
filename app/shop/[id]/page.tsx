import Header from "../../../src/components/Header"

const getCar: (id: string) => Promise<ICar | undefined> = async (id: string) => {
    const res: Response = await fetch(process.env.DATA_URL + '/api/cars.json')

    if (!res.ok) {
        return undefined
    }

    const cars: ICar[] = await res.json()
    const car = cars.find(car => car.id === id)

    return car
}

interface IShopPage {
    params: {
        id: string
    }
}

const ShopPage = async ({ params }: IShopPage) => {
    const { id } = params

    const car = await getCar(id)
    
    return (
        <>
            <Header><h2 className="heading-2">Shop { car?.modelName }</h2></Header>
            <div className="w-full">
                <p className="body-16">
                    {car ? JSON.stringify(car) : 'That car id does not exist.'}
                </p>
            </div>
        </>
    )
}

export default ShopPage
