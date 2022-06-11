import React from "react";
import { GetServerSideProps } from "next";
import { VehicleInformation } from "@Models/vehicleInformation";
import { getVehicleById } from "@Services/vehicleServices";
import { Flex, Text } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";

interface ShopPageProps {
  vehicle: VehicleInformation;
}

export default function ShopPage({ vehicle }: ShopPageProps) {
  return (
    <Flex extend={{ alignItems: "center", padding: 24 }}>
      <Text variant="cook">{`Purchase ${vehicle.modelName}`}</Text>

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
