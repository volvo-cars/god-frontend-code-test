import { useRouter } from "next/router";
import React, { useState } from "react";
import { Car } from "../../src/models/car";
import { Text } from "vcc-ui";
import Head from "next/head";
const Learn = () => {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState<Car>();

  const fetchCar = async () => {
    const res = await fetch(`/api/cars?id=${id}`);
    const data = await res.json();
    return data;
  };

  React.useEffect(() => {
    fetchCar()
      .catch(console.error)
      .then((cars) => {
        if (cars[0]) {
          setCar(cars[0]);
        }
      });
  });
  return (
    <>
      <Head>
        <title>LEARN {car?.modelName}</title>
      </Head>
      <hgroup>
        <Text variant="hillary" subStyle="emphasis">
          Learn more about {car?.modelName}
        </Text>
        <Text variant="hillary">
          {" "}
          all good with {car?.modelName} and {car?.modelName}{" "}
        </Text>
      </hgroup>
    </>
  );
};

export default Learn;
