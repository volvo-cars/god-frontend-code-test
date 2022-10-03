import { NextPageContext } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { TabNav, TabNavItem } from "vcc-ui";
import { CarItem } from "../src/components/CarItem";
import { Carousel } from "../src/components/Carousel";
import { MainPage } from "../src/components/MainPage";
import { MainPageContent } from "../src/components/MainPageContent";
import { MainPageNav } from "../src/components/MainPageNav";
import { Car } from "../types/Car";
import { BODY_TYPES, CarBodyType } from "../types/CarBodyType";
import { fetcher } from "../utils/fetcher";

interface HomePageProps {
  cars: Car[];
}

const Home: React.FC<HomePageProps> = (props) => {
  const [bodyType, setBodyType] = useState<CarBodyType>("all");
  const [filteredCars, setFilteredCars] = useState<Car[]>(props.cars);

  const getCarByType = useCallback(
    (type: CarBodyType) => {
      const cars =
        type === "all"
          ? props.cars
          : props.cars.filter((car) => car.bodyType === type);
      return cars;
    },
    [props.cars]
  );

  useEffect(() => {
    const cars = getCarByType(bodyType);

    setFilteredCars(cars);
  }, [bodyType, props.cars, getCarByType]);

  return (
    <React.StrictMode>
      <Head>
        <title>Volvo</title>
      </Head>
      <MainPage>
        <MainPageNav>
          <TabNav>
            {BODY_TYPES.map((type, index) => {
              return (
                <TabNavItem
                  key={index}
                  onClick={(e) => {
                    setBodyType(type);
                  }}
                  isActive={bodyType === type}
                >
                  {type} {getCarByType(type).length}
                </TabNavItem>
              );
            })}
          </TabNav>
        </MainPageNav>
        <MainPageContent>
          <Carousel data={filteredCars} itemsPerSlide={4}>
            {(car: Car) => <CarItem car={car} />}
          </Carousel>
        </MainPageContent>
      </MainPage>
    </React.StrictMode>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const cars = await fetcher(`/api/cars`);
  return { props: { cars } };
}

export default Home;
