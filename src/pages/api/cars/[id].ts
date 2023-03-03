import type { NextApiRequest as Request, NextApiResponse as Response } from 'next'
import cars from '../../../../public/api/cars.json';
import { Car } from '../../../types';

type ApiError = {
  message: string;
  status: number;
}

export default function handler(req: Request, res: Response<Car | ApiError>) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: 'No id provided', status: 400 });
    return;
  }

  const car = cars.find((car) => car.id === id);

  if (!car) {
    res.status(404).json({ message: 'Car not found', status: 404 });
    return;
  }

  res.status(200).json(car);
}
