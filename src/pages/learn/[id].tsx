import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, IconButton, Text } from 'vcc-ui';
import CarDetails from '../../components/CarDetails/CarDetails';
import { getCarById } from '../../services/api';
import { generateCarPaths } from '../../services/utils';
import { Car } from '../../types';

type LearnPageProps = {
  car: Car;
};

export const getStaticPaths = generateCarPaths;

export const getStaticProps: GetStaticProps<LearnPageProps> = ({ params }) => {
  if (!params || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const car = getCarById(params.id);

  if (!car) {
    return {
      notFound: true,
    };
  }

  return { props: { car } };
};

const Learn: NextPage<LearnPageProps> = (props) => {
  const router = useRouter();

  return (
    <div className="wrapper">
      <Head>
        <title>Learn | {props.car.modelName}</title>
      </Head>
      <Flex extend={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <IconButton
          onClick={() => router.back()}
          aria-label="Go back"
          iconName="navigation-chevronback"
          variant="transparent"
        />
        <Text variant="peary">Learn More</Text>
      </Flex>

      <CarDetails car={props.car} />
    </div>
  );
};

export default Learn;
