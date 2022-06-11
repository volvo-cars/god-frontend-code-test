import React from "react";
import { GetStaticProps } from "next";
import { VehicleInformation } from "@Models/vehicleInformation";
import { Block, View } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import { Dimensions } from "@Constants/dimensions";
import { getAllVehicles } from "@Services/vehicleServices";

interface HomePageProps {
  vehicles: Array<VehicleInformation>;
}

export default function HomePage({ vehicles }: HomePageProps) {
  const maxWidth =
    Dimensions.vehicleCardWidth * 4 + Dimensions.vehicleCardSpacing * 3;

  return (
    <Block
      extend={{ maxWidth: maxWidth, marginLeft: "auto", marginRight: "auto" }}
    >
      <View extend={{ overflowY: "hidden", paddingTop: 100 }}>
        <View
          extend={{
            flexDirection: "row",
            scrollSnapType: "x mandatory",
            overflowX: "auto",
            scrollPaddingLeft: 24,
            scrollPaddingRight: 24,
            paddingLeft: 24,
            marginBottom: -20,
            paddingBottom: 20,
            fromL: {
              // overflowX: "hidden",
            },
          }}
        >
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicleInfo={vehicle}
              interactive={true}
              extend={{
                width:
                  Dimensions.vehicleCardWidth + Dimensions.vehicleCardSpacing,
                scrollSnapAlign: "start",
                paddingRight: Dimensions.vehicleCardSpacing,
              }}
            />
          ))}
        </View>
      </View>
    </Block>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const vehicles = await getAllVehicles();
  return { props: { vehicles } };
};
