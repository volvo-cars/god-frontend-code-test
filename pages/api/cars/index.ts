import { NextApiRequest, NextApiResponse } from "next";
import response from "../../../public/api/cars.json";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(response);
}
