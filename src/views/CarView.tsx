import s from "./CarView.module.scss";
import React, { ReactElement, useEffect, useState } from "react";
import _ from "lodash";
import { TextInput } from "vcc-ui";
import { Car } from "../models/Car";
import { includesIgnoreCase } from "../util/stringUtils";
import { CarList } from "../components/CarList";

export function CarView(): ReactElement {
  const [filter, setFilter] = useState("");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  const fetchCars = async () => {
    const response = await fetch('http://localhost:3000/api/cars.json');
    const promisedCars = response.json() as Promise<Car[]>;
    const result = await promisedCars;

    setAllCars(result);
    setFilteredCars(result);
  };

  useEffect(() => {
    void fetchCars();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.trim());
  };

  const filterCars = () => {
    const result = _.isEmpty(filter)
      ? allCars
      : allCars.filter((car) => includesIgnoreCase(car.bodyType, filter));

    setFilteredCars(result);
  };

  useEffect(() => {
    filterCars();
  }, [filter]);

  return (
    <div className={s.carView}>
      <TextInput
        value={filter}
        label="Body type"
        onChange={handleFilterChange}
      />
      <CarList cars={filteredCars} />
    </div>
  )
}
