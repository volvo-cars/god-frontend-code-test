import { CarType } from '../types/cars'
import { apiClient } from './index'

export const fetchCars = async (): Promise<CarType[]> => {
  const data = JSON.parse((await apiClient('cars')).data)
  return Object.keys(data).map((key) => data[key])
}

export const fetchCar = async (carId: string): Promise<CarType | string> => {
  const data = JSON.parse((await apiClient.post('car', { id: carId })).data)
  if (data.length === 0) {
    return 'No car found'
  }
  return data[0]
}

export const fetchCarIds = async (): Promise<{ params: { id: string } }[]> => {
  const data = JSON.parse((await apiClient('cars')).data)
  return Object.keys(data).map((key) => ({ params: { id: data[key].id } }))
}
