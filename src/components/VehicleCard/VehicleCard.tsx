import React from "react";
import { VehicleInformation } from "@Models/vehicleInformation";
import { Flex, Text, useTheme, View, Spacer, Block } from "vcc-ui";
import Link from "next/link";
import Image from "next/image";
import { CurrentTheme, ExtendPropValue } from "vcc-ui/dist/types/shared";

export interface VehicleCardProps {
  /**
   * The information of a vehicle to be rendered
   */
  vehicleInfo: VehicleInformation;

  /**
   * true: display "LEARN" and "SHOP" buttons
   * false: hide "LEARN" and "SHOP" buttons
   */
  interactive: boolean;

  /**
   * A CSS object or a function returning a CSS object
   */
  extend?: ExtendPropValue<CurrentTheme>;
}

export default function VehicleCard({
  vehicleInfo,
  interactive,
  extend,
}: VehicleCardProps) {
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

      <Block extend={{ pointerEvents: "none", marginTop: 16 }}>
        <Image src={imageUrl} alt={modelName} width={800} height={600} />
      </Block>

      {interactive && (
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
      )}
    </View>
  );
}
