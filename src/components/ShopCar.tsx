import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Block, Button, Flex, Link, Spacer, Text } from 'vcc-ui';
import { getSingleCar } from '../logic';

export const ShopCar: React.FC = () => {
  const router = useRouter();
  const { carId } = router.query;
  const car = getSingleCar(carId as string);

  const { bodyType, imageUrl, modelName, modelType } = car || {};
  const getAmount = () => Math.floor(Math.random() * 100000 + 35000);

  return car ? (
    <Block>
      <Flex
        extend={{
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          fromM: {
            height: '100vh',
            width: '400',
          },
        }}
      >
        <Text variant='cook' subStyle='emphasis'>
          {modelName}
        </Text>
        <Spacer />
        <Block
          extend={{
            untilM: {
              minWidth: '260px',
            },
          }}
        >
          <Image
            src={imageUrl || ''}
            alt={modelName}
            width='400px'
            height='300px'
          />
        </Block>
        <Spacer />

        <Button>Buy for ${getAmount()}</Button>
        <Spacer />

        <Flex
          extend={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Spacer size={2} />

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
            <Link href={`/electric`} arrow='right'>
              All cars
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Block>
  ) : null;
};
