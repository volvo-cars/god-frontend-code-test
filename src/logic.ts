import { CarInfoType } from './types/CarInfo';
import carsData from '../public/api/cars.json';
import { useMemo } from 'react';

export const useGetTotalPages = (data: CarInfoType[], carsOnPage: number) =>
  useMemo(() => Math.ceil(data.length / carsOnPage), [carsOnPage, data.length]);

export const useGetCars = (
  pageNumber: number,
  carsOnPage: number,
  filter?: string,
) =>
  useMemo(() => {
    const data = filter
      ? carsData.filter((car) => car.bodyType === filter)
      : carsData;

    return data.slice((pageNumber - 1) * carsOnPage, pageNumber * carsOnPage);
  }, [carsOnPage, filter, pageNumber]);

export const getAllCars = () => carsData;

export const getSingleCar = (carId: string) =>
  carsData.find((car) => car.id === carId);

export const changePage = (page: number, forward: boolean) =>
  forward ? ++page : --page;
