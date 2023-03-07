import { GetStaticPaths } from "next";
import { getCars } from "./api";


export const generateCarPaths: GetStaticPaths = () => {
  const cars = getCars();
  const paths = cars.map((car) => ({
    params: { id: car.id },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};
