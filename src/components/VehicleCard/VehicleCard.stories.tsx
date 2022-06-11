import React from "react";
import { Meta, Story } from "@storybook/react";
import VehicleCard, { VehicleCardProps } from "./VehicleCard";
import { VehicleBodyType } from "@Models/vehicleInformation";

export default {
  title: "Component/VehicleCard",
  component: VehicleCard,
} as Meta;

const Template: Story<VehicleCardProps> = (args) => <VehicleCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  vehicleInfo: {
    id: "xc90-recharge",
    modelName: "XC90 Recharge",
    bodyType: VehicleBodyType.suv,
    modelType: "plug-in hybrid",
    imageUrl: "http://localhost:3000/images/xc90_recharge.jpg",
  },
};
