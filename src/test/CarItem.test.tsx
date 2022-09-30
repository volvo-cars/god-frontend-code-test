import { render, screen } from "@testing-library/react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import { describe, expect, it } from "vitest";
import { Car } from "../../types/Car";
import { CarItem } from "../components/CarItem";

const mockedData: Car = {
  id: "randomId",
  bodyType: "suv",
  imageUrl: "/images/xc90_recharge.jpg",
  modelName: "volvoNiceCar",
  modelType: "plug-in hybrid",
};

describe("CarItem ", () => {
  it("the title is visible", () => {
    render(
      <StyleProvider>
        <ThemePicker variant="light">
          <CarItem car={mockedData}></CarItem>
        </ThemePicker>
      </StyleProvider>
    );

    expect(screen.getByText(mockedData.modelName)).toBeInTheDocument();
    expect(screen.getByAltText(mockedData.modelName)).toBeInTheDocument();
  });

  it("car item should render learn and shop links with correctId", () => {
    render(
      <StyleProvider>
        <ThemePicker variant="light">
          <CarItem car={mockedData}></CarItem>
        </ThemePicker>
      </StyleProvider>
    );

    const learnLink = screen.getByText("Learn").closest("a");
    const shopLink = screen.getByText("Shop").closest("a");

    expect(learnLink).toHaveAttribute("href", `/learn/${mockedData.id}`);
    expect(shopLink).toHaveAttribute("href", `/shop/${mockedData.id}`);
  });
});
