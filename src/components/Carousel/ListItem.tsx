/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { Flex, Spacer, Text, View } from "vcc-ui";
import CommonLink from "../Link/Link";
import { CarInfo } from "../../util/types";

export const ListItem: React.FC<CarInfo> = ({
  id,
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
        <img src={imageUrl} alt={modelName}></img>
      </Flex>
      <View>
        <Flex
          extend={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CommonLink text="LEARN" id={id} />
          <Spacer />
          <Spacer />
          <CommonLink text="SHOP" id={id} />
        </Flex>
      </View>
    </View>
  );
};

export default ListItem;
