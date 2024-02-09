import { useRouter } from "next/router";
import React, { useState } from "react";
import { Car } from "../../src/models/car";
import { Text } from "vcc-ui";
import Head from "next/head";
const Shop = () => {
  const { id } = useRouter().query;
  const [car, setCar] = useState<Car>();

  React.useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(`/api/cars?id=${id}`);
      const data = await res.json();
      return data;
    };
  
    fetchCar()
      .catch(console.error)
      .then((cars) => {
        if (cars?.at(0)) {
          setCar(cars?.at(0));
        }
      });
  }, [id]);
  return (
    <>
      <Head>
        <title>Volvo | SHOP {car?.modelName}</title>
      </Head>
      <hgroup role="heading" aria-level={1}>
        <Text variant="hillary" subStyle="emphasis">
          BUY ALL GOOD {car?.modelName}
        </Text>
        <Text variant="hillary">
          {" "}
          all good with {car?.modelType} and {car?.bodyType}{" "}
        </Text>
      </hgroup>
    </>
  );
};

export default Shop;
