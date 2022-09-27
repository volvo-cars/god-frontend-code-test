import React, { useCallback, useEffect, useState } from 'react';
import CarInfo from '../CarInfo';
import { getAllCars, useGetCars, useGetTotalPages } from '../../logic';
import CarsCarousel from '../../CarsCarousel/CarsCarousel';
import CarouselDots from '../../CarsCarousel/CarouselDots';
import { useRouter } from 'next/router';

export const CarsListMobile: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const target = React.createRef<HTMLDivElement>();

  const { query } = useRouter();

  const allCars = getAllCars();

  const filter = query.bodyType as string;
  const filteredCars = useGetCars(1, allCars.length, filter?.toLowerCase());

  const [data, setData] = useState(filteredCars);

  useEffect(() => {
    setData(filteredCars);
  }, [query, filter, filteredCars]);

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const scrollFromLeft = element.scrollLeft;
    const total = element.scrollWidth - element.clientWidth;
    if (scrollFromLeft === 0) {
      return setScrollProgress(0);
    }

    if (scrollFromLeft > total) {
      return setScrollProgress(100);
    }

    setScrollProgress((scrollFromLeft / total) * 100);
  }, [target]);

  useEffect(() => {
    const targetValue = target.current;
    target?.current?.addEventListener('scroll', scrollListener);

    return () => {
      targetValue && targetValue.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener, target]);

  return (
    <>
      <CarsCarousel
        target={target}
        extend={{
          paddingTop: '16',
        }}
      >
        {data.map((car) => (
          <CarInfo car={car} key={car.id} />
        ))}
      </CarsCarousel>
      <CarouselDots
        scrollProgress={scrollProgress}
        count={filteredCars.length}
      />
    </>
  );
};
