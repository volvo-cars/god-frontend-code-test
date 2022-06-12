import React from "react";
import { Meta, Story } from "@storybook/react";
import HorizontalSlider, { HorizontalSliderProps } from "./HorizontalSlider";

export default {
  title: "Component/HorizontalSlider",
  component: HorizontalSlider,
} as Meta;

const Template: Story<HorizontalSliderProps> = ({ children, ...args }) => (
  <div style={{ maxWidth: 800 }}>
    <HorizontalSlider {...args}>{children}</HorizontalSlider>
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
    <div
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
    </div>
  )),
};
