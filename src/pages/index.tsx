import React, { useMemo, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Text } from 'vcc-ui';
import CarBlock from '../components/CarBlock/CarBlock';
import Carousel from '../components/Carousel/Carousel';
import Filter from '../components/Filter/Filter';
import { useViewport } from '../hooks/useViewport';
import { getCars } from '../services/api';
import { Car } from '../types';

type HomePageProps = {
  cars: Car[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = () => {
  const cars = getCars();

  return { props: { cars } };
};

const HomePage: NextPage<HomePageProps> = (props) => {
  const { format, visibleCarouselItems } = useViewport();
  const [selectedType, setSelectedType] = useState<string>('all');

  const allTypes = useMemo(() => {
    return [...new Set(props.cars.map((car) => car.bodyType))];
  }, [props.cars]);

  const filteredCars = useMemo(() => {
    if (selectedType === 'all') {
      return props.cars;
    }

    return props.cars.filter((car) => car.bodyType === selectedType);
  }, [props.cars, selectedType]);

  return (
    <div className="wrapper">
      <Head>
        <title>Volvo Cars</title>
      </Head>
      <Text variant="peary">Volvo Cars</Text>
      <Filter
        types={allTypes}
        selected={selectedType}
        handleClick={setSelectedType}
      />
      <Carousel
        items={filteredCars.map((car) => (
          <CarBlock key={car.id} car={car} />
        ))}
        visibleItems={visibleCarouselItems}
        showArrows={format !== 'mobile'}
        showDots={format === 'mobile'}
      />
    </div>
  );
};

export default HomePage;
