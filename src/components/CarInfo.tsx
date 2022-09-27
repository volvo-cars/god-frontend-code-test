import React from 'react';
import Image from 'next/image';
import { Block, Flex, Text, Spacer, Link } from 'vcc-ui';
import { CarInfoType } from '../types/CarInfo';

type CarInfoPropsType = {
  car: CarInfoType;
};

const CarInfo: React.FC<CarInfoPropsType> = (props) => {
  const {
    car: { id: carId, bodyType, imageUrl, modelName, modelType },
  } = props;

  return (
    <>
      <Spacer />
      <Flex
        extend={{
          height: '100%',
          fromM: {
            width: '25%',
          },
        }}
      >
        <Text variant='bates' subStyle='emphasis'>
          {bodyType.toUpperCase()}
        </Text>
        <Block>
          <Text
            variant='columbus'
            subStyle='emphasis'
            extend={{
              fromM: {
                display: 'inline',
              },
              untilM: {
                display: 'block',
              },
            }}
          >
            {modelName}
          </Text>
          <Text
            variant='columbus'
            extend={{
              fromM: {
                display: 'inline',
                marginLeft: '4',
              },
              untilM: {
                display: 'block',
              },
            }}
          >
            {modelType}
          </Text>
        </Block>
        <Spacer />
        <Block
          extend={{
            untilM: {
              minWidth: '260px',
            },
          }}
        >
          <Image
            src={imageUrl}
            alt={modelName}
            width='400px'
            height='300px'
            layout='responsive'
            objectFit='contain'
          />
        </Block>
        <Flex
          extend={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Link href={`/learn/${carId}`} arrow='right'>
            Learn
          </Link>
          <Spacer size={2} />
          <Link href={`/shop/${carId}`} arrow='right'>
            Shop
          </Link>
        </Flex>
      </Flex>
      <Spacer />
    </>
  );
};

export default CarInfo;
