import React from "react";
import { Meta, Story } from "@storybook/react";
import HorizontalSwiper, { HorizontalSwiperProps } from "./HorizontalSwiper";

export default {
  title: "Component/HorizontalSwiper",
  component: HorizontalSwiper,
} as Meta;

const Template: Story<HorizontalSwiperProps> = ({ children, ...args }) => (
  <div style={{ maxWidth: 800 }}>
    <HorizontalSwiper {...args}>{children}</HorizontalSwiper>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  itemWidth: 200,
  spacing: 2,
  children: [
    "red",
    "cyan",
    "yellow",
    "gray",
    "orange",
    "royalblue",
    "darkkhaki",
  ].map((backgroundColor) => (
    <li
      style={{
        width: 200,
        height: 100,
        backgroundColor,
        color: "black",
        fontSize: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
      key={backgroundColor}
    >
      {backgroundColor}
    </li>
  )),
};
