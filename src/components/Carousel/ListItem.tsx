/* eslint-disable @next/next/no-img-element */
import { kill } from "process";
import React, { useEffect } from "react";
import { Flex, Icon, Spacer, Text, View } from "vcc-ui";
import Chevron from "../../docs/chevron-small.svg"; // TODO: Get from SVG
import { CarInfo } from "./types";

export const ListItem: React.FC<CarInfo> = ({
  modelName,
  bodyType,
  modelType,
  imageUrl
}: CarInfo) => {
  return (
    <View extend={{ margin: "12px" }}>
      <View>
        <Text variant="columbus" extend={{ color: "gray" }} subStyle="emphasis">
          {bodyType.toUpperCase()}
        </Text>
        <Spacer />
        <Flex
          // @ts-ignore
          extend={{
            textAlign: "left",
            flexDirection: {
              default: "column",
              fromL: "row"
            }
          }}
        >
          <Text
            variant="hillary"
            subStyle={"emphasis"}
            extend={{ marginRight: "10px" }}
          >
            {modelName}
          </Text>
          <Text
            extend={{ color: "gray" }}
            variant="hillary"
            subStyle={"emphasis"}
          >
            {modelType}
          </Text>
        </Flex>
      </View>
      <Flex
        extend={{
          justifyContent: "center",
          margin: "24px 0px 24px 0px"
        }}
      >
        <img src={imageUrl} alt="S60-recharge"></img>
      </Flex>
      <View>
        <Flex
          extend={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            extend={{ marginLeft: "10px", color: "steelblue" }}
            variant="hillary"
            subStyle={"emphasis"}
          >
            LEARN
          </Text>
          <Icon type="navigation-chevronforward-24" color="action" />
          <Text
            extend={{ marginLeft: "10px", color: "steelblue" }}
            variant="hillary"
            subStyle={"emphasis"}
          >
            SHOP
          </Text>
          <Icon type="navigation-chevronforward-24" color="action" />
        </Flex>
      </View>
    </View>
  );
};

export default ListItem;
