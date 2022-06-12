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
    imageUrl:
      "https://www.volvocars.com/images/v/-/media/project/contentplatform/data/media/my23/car-images/xc90-phev-my23-responsive.jpg?h=600&w=800",
  },
};
