import type { NextApiRequest as Request, NextApiResponse as Response } from 'next'
import cars from '../../../public/api/cars.json';
import { Car } from '../../types';

export default function handler(_req: Request, res: Response<Car[]>) {
  res.status(200).json(cars);
}
