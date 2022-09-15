import s from "./CarList.module.scss";
import React, { ReactElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "vcc-ui";
import { Navigation, Pagination } from "swiper";
import { Car } from "../models/Car";

type Props = {
  cars: Car[];
};

export function CarList({ cars }: Props): ReactElement {
  return (
    <Swiper
      // Default parameters
      style={{
        // @ts-ignore TS2322: Type '{ "--swiper-navigation-size": string; }' is not assignable to type 'Properties<string | number, string & {}>'
        "--swiper-navigation-size": "65px",
      }}
      modules={[Pagination, Navigation]}
      navigation={true}
      pagination={true}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        320: { // when window width is >= 320px
          slidesPerView: 2
        },
        640: { // when window width is >= 640px
          slidesPerView: 3
        },
        960: { // when window width is >= 960px
          slidesPerView: 4,
          spaceBetween: 30
        }
      }}
      className={s.carList}
    >
      {cars.map((car) => (
        <SwiperSlide key={car.id}>
          <span className="body-type">{car.bodyType}</span>
          <div className="model-info">
            <h2>{car.modelName}</h2>
            <span>{car.modelType}</span>
          </div>
          <img src={car.imageUrl} alt="car-photo" />
          <div className="links">
            <Link href={`/learn/${car.id}`} arrow="right">Learn</Link>
            <Link href={`/shop/${car.id}`} arrow="right">Shop</Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
