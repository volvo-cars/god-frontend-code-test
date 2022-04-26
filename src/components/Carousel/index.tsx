import React, { useEffect, useState } from "react";
import { Flex } from "vcc-ui";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ListItem from "./ListItem";
import { CarInfo } from "../../util/types";
import SearchBar from "../SearchBar/SearchBar";

const CarList: React.FC = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.5,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const [carList, setCarList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      setWindowWidth(document.body.clientWidth);
    });

    fetch("/api/cars")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCarList(data);
        setFilteredList(data);
      });
  }, []);
  return (
    <>
      <SearchBar itemList={carList} setFilteredList={setFilteredList} />
      <Carousel
        responsive={responsive}
        showDots={windowWidth < 1024 ? true : false}
        renderDotsOutside
        partialVisible
        removeArrowOnDeviceType={["mobile", "tablet"]}
        autoPlay={false}
      >
        {filteredList &&
          filteredList.map((car: CarInfo) => {
            return (
              <ListItem
                key={car.id}
                id={car.id}
                modelName={car.modelName}
                bodyType={car.bodyType}
                modelType={car.modelType}
                imageUrl={car.imageUrl}
              />
            );
          })}
      </Carousel>
    </>
  );
};

export default CarList;
