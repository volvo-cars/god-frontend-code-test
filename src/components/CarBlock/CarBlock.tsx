import React from 'react';
import Image from 'next/image';
import { Flex, Link, Text } from 'vcc-ui';
import { Car } from '../../types';
import styles from './CarBlock.module.scss';

const IMG_HEIGHT = 600;
const IMG_WIDTH = 800;
const SCALE = 1;

type CarProps = {
  car: Car;
};

const CarBlock: React.FC<CarProps> = (props) => {
  return (
    <article className={styles.block}>
      <Text>{props.car.bodyType}</Text>
      <Text>
        <b>{props.car.modelName}</b> <span>{props.car.modelType}</span>
      </Text>
      <Image
        src={props.car.imageUrl}
        width={IMG_WIDTH * SCALE}
        height={IMG_HEIGHT * SCALE}
        alt={props.car.modelName}
      />

      <Flex
        extend={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <Link href={`/learn/${props.car.id}`} arrow="right">
          Learn
        </Link>

        <Link href={`/shop/${props.car.id}`} arrow="right">
          Shop
        </Link>
      </Flex>
    </article>
  );
};

export default CarBlock;
