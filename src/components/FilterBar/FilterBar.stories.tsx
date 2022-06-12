import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import FilterBar, { FilterBarProps } from "./FilterBar";

export default {
  title: "Component/FilterBar",
  component: FilterBar,
} as Meta;

const Template: Story<FilterBarProps> = (args) => {
  const [value, setValue] = useState<string>(args.options[0]);

  return <FilterBar {...args} selected={value} onSelect={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  options: ["XC40", "XC60", "XC90"],
};

export const Invalid = Template.bind({});
Invalid.args = {
  label: "Label",
  options: ["XC40", "XC60", "XC90"],
  errorMessage: "Error message",
  isValid: false,
};
