import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import { TabNav, TabNavItem } from "vcc-ui";
import response from "../public/api/cars.json";
import { Carousel } from "../src/components/Carousel";
import { Car } from "../types/Car";

interface HomePageProps {
  cars: Car[];
}

const Home: React.FC<HomePageProps> = (props) => {
  const [active, setActive] = React.useState(1);

  return (
    <React.StrictMode>
      <Head>
        <title>Volvo - Cars list</title>
      </Head>

      <TabNav enableLineTransition>
        <TabNavItem
          isActive={active === 1}
          onClick={() => {
            setActive(1);
          }}
        >
          Crossover/Wagon
        </TabNavItem>
        <TabNavItem
          isActive={active === 2}
          onClick={() => {
            setActive(2);
          }}
        >
          SUV
        </TabNavItem>
        <TabNavItem
          isActive={active === 3}
          onClick={() => {
            setActive(3);
          }}
        >
          Sedan
        </TabNavItem>
      </TabNav>
      <Carousel cars={props.cars}></Carousel>
    </React.StrictMode>
  );
};

export async function getStaticProps(context: NextPageContext) {
  return { props: { cars: response as Car[] } };
}

export default Home;
