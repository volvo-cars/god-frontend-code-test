import React, { useState } from "react";
import { GetStaticProps } from "next";
import {
  VehicleBodyType,
  VehicleInformation,
} from "@Models/vehicleInformation";
import { Block, useTheme } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import { Dimensions } from "@Constants/dimensions";
import { getAllVehicles } from "@Services/vehicleServices";
import HorizontalSlider from "@Components/HorizontalSlider";
import FilterBar from "@Components/FilterBar";
import Head from "next/head";

type BodyTypeOption = VehicleBodyType | "ALL";

interface HomePageProps {
  vehicles: Array<VehicleInformation>;
}

export default function HomePage({ vehicles }: HomePageProps) {
  const { baselineGrid } = useTheme();
  const vehicleItemSpacing = 3;
  const maxContentWidth =
    Dimensions.vehicleCardWidth * 4 +
    vehicleItemSpacing * baselineGrid * (4 - 1);

  const [filterKey, setFilterKey] = useState<BodyTypeOption>("ALL");

  const [filteredVehicles, setFilteredVehicles] =
    useState<Array<VehicleInformation>>(vehicles);

  function onFilterKeyChanged(filterKey: string) {
    setFilterKey(filterKey as BodyTypeOption);

    if (filterKey === "ALL") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(
        vehicles.filter((vehicle) => vehicle.bodyType.includes(filterKey))
      );
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
          fromL: {
            paddingLeft: 24,
            paddingRight: 24,
          },
        }}
      >
        <h1 style={{ textAlign: "center" }}>Home page</h1>

        <Block
          as="section"
          extend={{ marginBottom: 40, paddingTop: 24, untilL: { padding: 24 } }}
        >
          <FilterBar
            label="Filter cars by the body type."
            options={["ALL", ...Object.values(VehicleBodyType)]}
            onSelect={onFilterKeyChanged}
            selected={filterKey}
          />
        </Block>

        <Block as="section">
          <HorizontalSlider
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
          </HorizontalSlider>
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
