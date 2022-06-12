import React from "react";
import { GetServerSideProps } from "next";
import { VehicleInformation } from "@Models/vehicleInformation";
import { getVehicleById } from "@Services/vehicleServices";
import { Flex, Text } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import Head from "next/head";

interface LearnPageProps {
  vehicle: VehicleInformation;
}

export default function LearnPage({ vehicle }: LearnPageProps) {
  const title = `Learn about ${vehicle.modelName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex as="main" extend={{ alignItems: "center", padding: 24 }}>
        <Text variant="peary" extend={{ textAlign: "center" }}>
          {title}
        </Text>

        <VehicleCard
          as="section"
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
  LearnPageProps,
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
