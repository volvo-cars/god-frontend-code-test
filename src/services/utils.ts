import { GetStaticPaths } from "next";
import { getCars } from "./api";

/**
 * Capitalizes the first letter of a string
 *
 * @param s the string to capitalize
 * @returns Capitalized string
 */

export const capitalize = (s: string): string =>  {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
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
