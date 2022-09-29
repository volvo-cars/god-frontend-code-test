import { useState } from "react";
import { Flex, TabNav, TabNavItem } from "vcc-ui";
import { Car } from "../../types/Car";
import { BODY_TYPES, CarBodyType } from "../../types/CarBodyType";
import { CarItem } from "./CarItem";
import { Carousel } from "./Carousel";

interface CarContentProps {
  cars: Car[];
}

export function CarContent(props: CarContentProps) {
  const [bodyType, setBodyType] = useState<CarBodyType>("all");

  const filteredCars = (type: CarBodyType) => {
    return type === "all"
      ? props.cars
      : props.cars.filter((car) => car.bodyType === type);
  };

  return (
    <>
      <TabNav>
        {BODY_TYPES.map((type, index) => {
          return (
            <TabNavItem
              key={index}
              onClick={(e) => setBodyType(type)}
              isActive={bodyType === type}
            >
              {type} {filteredCars(type).length}
            </TabNavItem>
          );
        })}
      </TabNav>
      <Carousel data={filteredCars(bodyType)} itemsPerSlide={4}>
        {(car: Car) => <CarItem car={car} />}
      </Carousel>
    </>
  );
}
