import React from "react";
import { describe, expect, it, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Carousel } from "../components/Carousel";
import { StyleProvider, ThemePicker } from "vcc-ui";

type TestItem = {
  name: string;
};

const mockedData: TestItem[] = [
  {
    name: "item1",
  },
  { name: "item2" },
  { name: "item3" },
  {
    name: "item4",
  },
  { name: "item5" },
  { name: "item6" },
  { name: "item7" },
  { name: "item8" },
  { name: "item9" },
  { name: "item10" },
  { name: "item11" },
  { name: "item12" },
  { name: "item13" },
  { name: "item14" },
  { name: "item15" },
  { name: "item16" },
  { name: "item17" },
];

describe("Carousel ", () => {
  it("the title is visible", () => {
    render(
      <StyleProvider>
        <ThemePicker variant="light">
          <Carousel data={mockedData}>
            {(data: TestItem) => <h1>{data.name}</h1>}
          </Carousel>
        </ThemePicker>
      </StyleProvider>
    );
    mockedData.forEach((data) => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
    });
  });
});
