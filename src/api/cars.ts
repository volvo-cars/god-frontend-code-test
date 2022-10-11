import { CarType } from '../types/cars'
import { apiClient } from './index'

export const fetchCars = async (): Promise<CarType[]> => {
  return (await apiClient<CarType[]>('cars')).data
}
