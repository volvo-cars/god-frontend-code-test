import cars from '../../public/api/cars.json';
import { Car } from "../types";

export const getCars = (): Car[] => {
  return cars;
}

export const getCarById = (id: string): Car | undefined => {
  if (!id) {
    return undefined;
  }

  const car = cars.find((car) => car.id === id);

  if (!car) {
    return undefined;
  }

  return car;
}
