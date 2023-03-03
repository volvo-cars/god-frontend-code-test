import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Text } from 'vcc-ui';
import CarBlock from '../components/CarBlock/CarBlock';
import Carousel from '../components/Carousel/Carousel';
import { useViewport } from '../hooks/useViewport';
import { getCars } from '../services/api';
import { Car } from '../types';

type HomePageProps = {
  cars: Car[];
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const cars = await getCars();

  return { props: { cars } };
};

const HomePage: NextPage<HomePageProps> = (props) => {
  const { format, visibleCarouselItems } = useViewport();

  return (
    <div className="wrapper">
      <Text variant="cook">Volvo Cars</Text>
      <Carousel
        items={props.cars.map((car) => (
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
