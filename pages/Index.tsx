import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";

import response from "../public/api/cars.json";
import { CarContent } from "../src/components/CarContent";
import { Car } from "../types/Car";

interface HomePageProps {
  cars: Car[];
}

const Home: React.FC<HomePageProps> = (props) => {
  return (
    <React.StrictMode>
      <Head>
        <title>Volvo - Cars list</title>
      </Head>
      <CarContent cars={props.cars}></CarContent>
    </React.StrictMode>
  );
};

export async function getStaticProps(context: NextPageContext) {
  return { props: { cars: response as Car[] } };
}

export default Home;
