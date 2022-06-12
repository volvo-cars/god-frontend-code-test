import React, { ChangeEvent, useState } from "react";
import { GetStaticProps } from "next";
import { VehicleInformation } from "@Models/vehicleInformation";
import { Block, TextInput, Text } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import { Dimensions } from "@Constants/dimensions";
import { getAllVehicles } from "@Services/vehicleServices";
import HorizontalSlider from "@Components/HorizontalSlider";

interface HomePageProps {
  vehicles: Array<VehicleInformation>;
}

export default function HomePage({ vehicles }: HomePageProps) {
  const [searchKey, setSearchKey] = useState<string>("");

  const [filteredVehicles, setFilteredVehicles] =
    useState<Array<VehicleInformation>>(vehicles);

  const maxContentWidth =
    Dimensions.vehicleCardWidth * 4 + Dimensions.vehicleCardSpacing * 3;
  const vehicleItemWidth =
    Dimensions.vehicleCardWidth + Dimensions.vehicleCardSpacing;

  function onSearchKeyChanged(event: ChangeEvent<HTMLInputElement>) {
    const searchKey = event.target.value;
    setSearchKey(searchKey);

    if (searchKey) {
      setFilteredVehicles(
        vehicles.filter((vehicle) => vehicle.bodyType.includes(searchKey))
      );
    } else {
      setFilteredVehicles(vehicles);
    }
  }

  return (
    <Block
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
      <Block
        extend={{ marginBottom: 40, paddingTop: 24, untilL: { padding: 24 } }}
      >
        <TextInput
          value={searchKey}
          label="Body type"
          onChange={onSearchKeyChanged}
        />
      </Block>

      <HorizontalSlider itemWidth={vehicleItemWidth}>
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicleInfo={vehicle}
            interactive={true}
            extend={{
              width: vehicleItemWidth,
              scrollSnapAlign: "start",
              paddingRight: Dimensions.vehicleCardSpacing,
            }}
          />
        ))}
      </HorizontalSlider>

      {filteredVehicles.length === 0 && !!searchKey && (
        <Text variant="hillary" extend={{ textAlign: "center" }}>
          No matched search result.
        </Text>
      )}
    </Block>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  const vehicles = await getAllVehicles();
  return { props: { vehicles } };
};
