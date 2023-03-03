import { Car } from "../types";

export const getCars = async (): Promise<Car[]> => {
  const res = await fetch("http://localhost:3000/api/cars");
  const data = await res.json();

  return data;
}

export const getCarById = async (id: string): Promise<Car> => {
  const res = await fetch(`http://localhost:3000/api/cars/${id}`);
  const data = await res.json();

  return data;
}
