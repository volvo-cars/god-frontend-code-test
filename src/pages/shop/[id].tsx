import React from "react";
import { GetServerSideProps } from "next";
import { VehicleInformation } from "@Models/vehicleInformation";
import { getVehicleById } from "@Services/vehicleServices";
import { Flex, Text } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import Head from "next/head";

interface ShopPageProps {
  vehicle: VehicleInformation;
}

export default function ShopPage({ vehicle }: ShopPageProps) {
  const title = `Purchase ${vehicle.modelName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex as="main" extend={{ alignItems: "center", padding: 24 }}>
        <Text variant="cook">{title}</Text>

        <VehicleCard
          vehicleInfo={vehicle}
          interactive={false}
          extend={{
            width: "100%",
            maxWidth: 600,
            marginTop: 100,
          }}
        />
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  ShopPageProps,
  { id: string }
> = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const { id } = context.params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return { notFound: true };
  }
  return {
    props: { vehicle },
  };
};
