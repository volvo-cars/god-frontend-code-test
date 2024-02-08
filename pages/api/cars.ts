import { NextApiRequest, NextApiResponse } from "next";
import cars from "./cars.json";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let id = req.query.id as string
  let cars_filtered = id ? cars.filter(c => c.id.match(id)) : cars
  res.status(200).json(cars_filtered);
}
