import React from "react";
import { VehicleInformation } from "@Models/vehicleInformation";
import { Flex, Text, useTheme, View, Spacer } from "vcc-ui";
import Link from "next/link";
import { CurrentTheme, ExtendPropValue } from "vcc-ui/dist/types/shared";

export interface VehicleCardProps {
  /**
   * The information of a vehicle to be rendered
   */
  vehicleInfo: VehicleInformation;

  /**
   * A CSS object or a function returning a CSS object
   */
  extend: ExtendPropValue<CurrentTheme>;
}

export default function VehicleCard({ vehicleInfo, extend }: VehicleCardProps) {
  const theme = useTheme();

  const { id, modelName, bodyType, modelType, imageUrl } = vehicleInfo;

  return (
    <View extend={extend}>
      <Text subStyle="emphasis" fg={theme.color.primitive.grey200}>
        {bodyType}
      </Text>
      <Flex extend={{ fromM: { flexDirection: "row" } }}>
        <Text subStyle="emphasis" extend={{ marginRight: 4 }}>
          {modelName}
        </Text>
        <Text fg={theme.color.primitive.grey200}>{modelType}</Text>
      </Flex>

      <img
        src={imageUrl}
        alt={modelName}
        style={{ marginTop: 16, pointerEvents: "none" }}
      />

      <Flex
        extend={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <Link href={`/learn/${id}`}>LEARN</Link>
        <Spacer />
        <Link href={`/shop/${id}`}>SHOP</Link>
      </Flex>
    </View>
  );
}
