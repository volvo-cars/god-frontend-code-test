import React from 'react';
import Image from 'next/image';
import { Flex, Text } from 'vcc-ui';
import { useViewport } from '../../hooks/useViewport';
import { Car } from '../../types';
import Table from '../Table/Table';
import styles from './CarDetails.module.scss';

type CarDetailsProps = {
  car: Car;
};

const CarDetails: React.FC<CarDetailsProps> = (props) => {
  const { format } = useViewport();

  return (
    <article className={styles.container}>
      <Flex
        extend={{
          flexWrap: 'wrap',
          flexDirection: format === 'mobile' ? 'column-reverse' : 'row',
          gap: 16,
          padding: '1rem',
        }}
      >
        <div className={styles.cell}>
          <div className={styles.textContainer}>
            <Text variant="cook">{props.car.modelName}</Text>
            <Text variant="kelly">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto in corporis commodi magni amet assumenda ab? Reiciendis
              numquam quia, aut nisi perspiciatis tempora cum corrupti eaque
              repellat architecto, velit delectus.
            </Text>
            <Text variant="bates">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto in corporis commodi magni amet assumenda ab? Reiciendis
              numquam quia, aut nisi perspiciatis tempora cum corrupti eaque
              repellat architecto, velit delectus.
            </Text>
          </div>
          <Table
            data={{
              'Model Name': props.car.modelName,
              'Body Type': props.car.bodyType,
              'Model Type': props.car.modelType,
            }}
          />
        </div>

        <div className={styles.cell}>
          <Image
            className={styles.image}
            src={props.car.imageUrl}
            width={800}
            height={600}
            alt={props.car.id}
          />
        </div>
      </Flex>
    </article>
  );
};

export default CarDetails;
