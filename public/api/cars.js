import cars from "./cars.json";

export function getAllCars() {
  return cars;
}

export function getCarById(id) {
  return cars.find((car) => car.id === id);
}
