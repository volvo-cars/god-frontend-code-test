// export default function handler(req: any, res: any) {
//     res.status(200).json({ name: 'John Doe' })
//   }

  import carList from "../../public/api/cars.json";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(carList);
}
