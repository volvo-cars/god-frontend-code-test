/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Link, Flex, Spacer } from "vcc-ui";
import Chevron from "../../public/images/chevron-small.svg";
import { ILinkValue } from "../util/types";
const CommonLink: React.FC<ILinkValue> = ({id, text}) => {
  return (
    <Flex
      extend={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Link href={`/learn/${id}`}>{text}</Link>
      <Spacer />
      <img src={Chevron} width="14px" height="14px" />
    </Flex>
  );
};

export default CommonLink;
