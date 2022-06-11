import React from "react";
import { Meta, Story } from "@storybook/react";
import PaginationDots, { PaginationDotsProps } from "./PaginationDots";

export default {
  title: "Component/PaginationDots",
  component: PaginationDots,
} as Meta;

const Template: Story<PaginationDotsProps> = (args) => (
  <PaginationDots {...args} />
);

export const Default = Template.bind({});
Default.args = {
  total: 8,
  activeIndex: [3, 4, 5],
};
