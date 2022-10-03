import { NextApiRequest, NextApiResponse } from "next";
import response from "../../../public/api/cars.json";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { id } = _req.query;
  const result = response.find((car) => car.id === id);

  if (!result) {
    res.status(404).end("Car not found");
    return;
  }
  // Get data from your database
  res.status(200).json(result);
}
