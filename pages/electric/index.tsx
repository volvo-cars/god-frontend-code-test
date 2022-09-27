import Link from 'next/link';
import React, { useState } from 'react';
import { Flex, IconButton, Spacer, TextInput } from 'vcc-ui';
import { CarsListDesktop } from '../../src/components/CarsList/CarsListDesktop';
import { CarsListMobile } from '../../src/components/CarsList/CarsListMobile';

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <Flex
        extend={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          untilM: {
            width: '50%',
          },
          fromM: {
            width: '25%',
          },
          marginTop: 16,
          marginLeft: 8,
        }}
      >
        <TextInput
          label='Body type'
          value={filter}
          type='text'
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
        <Spacer />
        <Link
          href={{
            pathname: '/electric/',
            query: {
              ...(filter ? { bodyType: filter.toLowerCase() } : {}),
            },
          }}
        >
          <IconButton
            iconName='search'
            onClick={() => {
              return;
            }}
          />
        </Link>
      </Flex>
      <CarsListDesktop />
      <CarsListMobile />
    </>
  );
};

export default HomePage;
