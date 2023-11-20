import { ChangeEventHandler, Dispatch, SetStateAction } from "react"
import Header from "./Header"

interface INavigationBar {
    cars: ICar[]
    filteredBodyType: string
    setFilteredBodyType: Dispatch<SetStateAction<string>>
}

const NavigationBar = ({ cars, filteredBodyType, setFilteredBodyType }: INavigationBar) => {
    const bodyTypeSet = new Set(cars.map(car => car.bodyType))
    const bodyTypes = Array.from(bodyTypeSet)

    const onChangeFilteredBodyType: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        setFilteredBodyType(target.value)
    }

    return (
        <Header>
            <div className="v-input-floating-label w-full">
                <label htmlFor=":r3:-input">Car body type</label>
                <select name="terms" id=":r3:-input" data-blank="" value={filteredBodyType} onChange={onChangeFilteredBodyType}>
                    <option value="">Any</option>
                    {bodyTypes.map(bodyType => <option key={bodyType} value={bodyType}>{bodyType}</option>)}
                </select>
                <p id=":r3:-error" className="micro text-feedback-red empty:hidden mt-4" role="alert"></p>
            </div>
        </Header>
    )
}

export default NavigationBar
