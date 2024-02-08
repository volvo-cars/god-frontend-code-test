import React, { useState, useEffect } from "react";
import Nav from "../src/components/Nav";
import { Car, Cars } from "../src/models/car";
import Head from "next/head";
import CardSlider from "../src/components/cardslider/CardSlider";
import { IconButton, Spacer } from "vcc-ui/dist/components";

type HomePageModel = {
  cars: Cars;
  carTypes: string[];
};

function HomePage() {
  const [model, setModel] = useState<HomePageModel>({
    cars: [],
    carTypes: [],
  });

  const [filter, setFilter] = useState("");

  const carsFiltered: Cars = model.cars.filter((car) =>
    filter.match("clear") ? true : car.bodyType.match(filter)
  );

  const fetchCars = async () => {
    const response = await fetch("/api/cars");
    const cars: Car[] = await response.json();
    return cars;
  };

  const fetchCarsAndSet = () => {
    fetchCars()
      .catch(console.error)
      .then((c) => {
        if (c) {
          let model: HomePageModel = {
            cars: c,
            carTypes: c
              .map((car) => car.bodyType)
              .filter((v, i, a) => a.indexOf(v) == i),
          };
          setModel(model);
        }
      });
  };

  useEffect(fetchCarsAndSet, []);

  return (
    <>
      <Head>
        <title>Volvo Cars - Main Page</title>
      </Head>
      <Nav types={model.carTypes} onSelected={setFilter} />
      <Spacer size={100} />
      <CardSlider cars={carsFiltered} height="500px" />
    </>
  );
}

export default HomePage;
