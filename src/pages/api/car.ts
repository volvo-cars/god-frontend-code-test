import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body
  const jsonDirectory = path.join(process.cwd(), 'src', 'json')
  const fileContents = await fs.readFile(jsonDirectory + '/cars.json', 'utf8')
  const data = JSON.parse(fileContents)
  const arrayOfCars = Object.keys(data).map((key) => data[key])
  res
    .status(200)
    .json(JSON.stringify(arrayOfCars.filter((car) => car.id === id)))
}
