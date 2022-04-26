import carList from "./cars.json";
import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   id: string;
//   modelName: string;
//   bodyType: string;
//   modelType: string;
//   imageUrl: string;
// }[];
type ResponseData = {
    name: string;

  };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({name: 'John Doe'});
}
