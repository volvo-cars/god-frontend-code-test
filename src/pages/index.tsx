import React, { ChangeEvent, useState } from "react";
import { GetStaticProps } from "next";
import { VehicleInformation } from "@Models/vehicleInformation";
import { Block, TextInput, View, Text } from "vcc-ui";
import VehicleCard from "@Components/VehicleCard";
import { Dimensions } from "@Constants/dimensions";
import { getAllVehicles } from "@Services/vehicleServices";

interface HomePageProps {
  vehicles: Array<VehicleInformation>;
}

export default function HomePage({ vehicles }: HomePageProps) {
  const [searchKey, setSearchKey] = useState<string>("");

  const [filteredVehicles, setFilteredVehicles] =
    useState<Array<VehicleInformation>>(vehicles);

  const maxWidth =
    Dimensions.vehicleCardWidth * 4 + Dimensions.vehicleCardSpacing * 3;

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
        maxWidth: maxWidth,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Block extend={{ padding: 24 }}>
        <TextInput
          value={searchKey}
          label="Body type"
          onChange={onSearchKeyChanged}
        />
      </Block>

      <View
        extend={{
          overflowY: "hidden",
          paddingTop: 40,
        }}
      >
        <View
          extend={{
            flexDirection: "row",
            scrollSnapType: "x mandatory",
            overflowX: "auto",
            scrollPaddingLeft: 24,
            paddingLeft: 24,

            // Aim to hide the horizontal scroll bar
            marginBottom: -20,
            paddingBottom: 20,
            fromL: {
              // overflowX: "hidden",
            },
          }}
        >
          {filteredVehicles.map((vehicle) => (
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

        {filteredVehicles.length === 0 && !!searchKey && (
          <Text variant="hillary" extend={{ textAlign: "center" }}>
            No matched search result.
          </Text>
        )}
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
