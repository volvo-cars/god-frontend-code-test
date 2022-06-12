import React from "react";
import { VehicleInformation } from "@Models/vehicleInformation";
import { Flex, Text, useTheme, View, Block } from "vcc-ui";
import Image from "next/image";
import { CurrentTheme, ExtendPropValue } from "vcc-ui/dist/types/shared";
import NextLink from "@Components/NextLink";

export interface VehicleCardProps extends React.HTMLAttributes<HTMLElement> {
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
   * The HTML node that is rendered.
   * Default is div
   */
  as?: React.ElementType;

  /**
   * A CSS object or a function returning a CSS object
   */
  extend?: ExtendPropValue<CurrentTheme>;
}

export default function VehicleCard({
  vehicleInfo,
  interactive,
  extend,
  as = "div",
  ...rest
}: VehicleCardProps) {
  const theme = useTheme();

  const { id, modelName, bodyType, modelType, imageUrl } = vehicleInfo;

  const vehicleDescription = `${modelName} - ${bodyType} - ${modelType}`;

  return (
    <View<typeof as>
      as={as}
      extend={extend}
      aria-label={vehicleDescription}
      {...rest}
    >
      <Text
        subStyle="emphasis"
        fg={theme.color.primitive.grey200}
        aria-label={bodyType}
      >
        {bodyType}
      </Text>
      <Flex extend={{ fromM: { flexDirection: "row" } }}>
        <Text
          subStyle="emphasis"
          extend={{ marginRight: 4 }}
          aria-label={modelName}
        >
          {modelName}
        </Text>
        <Text fg={theme.color.primitive.grey200} aria-label={modelType}>
          {modelType}
        </Text>
      </Flex>

      <Block extend={{ pointerEvents: "none", marginTop: 16 }}>
        <Image
          src={imageUrl}
          alt={vehicleDescription}
          width={800}
          height={600}
        />
      </Block>

      {interactive && (
        <View
          extend={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 24,
          }}
          spacing={4}
        >
          <NextLink
            href={`/learn/${id}`}
            arrow="right"
            aria-label={`Learn more about ${modelName}`}
          >
            LEARN
          </NextLink>

          <NextLink
            href={`/shop/${id}`}
            arrow="right"
            aria-label={`Purchase ${modelName}`}
          >
            SHOP
          </NextLink>
        </View>
      )}
    </View>
  );
}
