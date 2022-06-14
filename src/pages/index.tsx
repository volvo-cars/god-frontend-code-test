import React, { useState } from "react";
import { GetStaticProps } from "next";
import {
  VehicleBodyType,
  VehicleInformation,
} from "@Models/vehicleInformation";
import { Block, useTheme, Text } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import { Dimensions } from "@Constants/dimensions";
import { getAllVehicles } from "@Services/vehicleServices";
import HorizontalSwiper from "@Components/HorizontalSwiper";
import FilterBar from "@Components/FilterBar";
import Head from "next/head";

type BodyTypeOption = VehicleBodyType | "all";

interface HomePageProps {
  vehicles: Array<VehicleInformation>;
}

export default function HomePage({ vehicles }: HomePageProps) {
  const { baselineGrid } = useTheme();
  const vehicleItemSpacing = 3;
  const maxContentWidth =
    Dimensions.vehicleCardWidth * 4 +
    vehicleItemSpacing * baselineGrid * (4 - 1);

  const [filterKey, setFilterKey] = useState<BodyTypeOption>("all");

  const [filteredVehicles, setFilteredVehicles] =
    useState<Array<VehicleInformation>>(vehicles);

  function onFilterKeyChanged(filterKey: string) {
    setFilterKey(filterKey as BodyTypeOption);

    if (filterKey === "all") {
      setFilteredVehicles(vehicles);
    } else {
      const filteredVehicles = vehicles.filter(
        (vehicle) => vehicle.bodyType === filterKey
      );

      setFilteredVehicles(filteredVehicles);
    }
  }

  return (
    <>
      <Head>
        <title>Volvo cars - homepage</title>
      </Head>

      <Block
        as="main"
        extend={{
          maxWidth: maxContentWidth,
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: 40,
          paddingTop: 24,
          fromL: {
            paddingLeft: 24,
            paddingRight: 24,
          },
        }}
      >
        <Text variant="peary" extend={{ textAlign: "center" }}>
          Home page
        </Text>

        <Block
          as="section"
          extend={{ marginBottom: 40, paddingTop: 24, untilL: { padding: 24 } }}
        >
          <FilterBar
            label="Filter cars by the body type."
            options={["all", ...Object.values(VehicleBodyType)]}
            onSelect={onFilterKeyChanged}
            selected={filterKey}
          />
        </Block>

        <Block as="section">
          <HorizontalSwiper
            itemWidth={Dimensions.vehicleCardWidth}
            spacing={vehicleItemSpacing}
          >
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                as="li"
                role="listitem"
                key={vehicle.id}
                vehicleInfo={vehicle}
                interactive={true}
                extend={{
                  width: Dimensions.vehicleCardWidth,
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </HorizontalSwiper>
        </Block>
      </Block>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const vehicles = await getAllVehicles();
  return { props: { vehicles } };
};
