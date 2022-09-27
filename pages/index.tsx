import React from 'react';
import Link from 'next/link';
import { Button, Flex } from 'vcc-ui';

const HomePage = () => {
  return (
    <Flex
      extend={{
        margin: 'auto',
        width: '240',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/electric'>
        <Button>View electric cars</Button>
      </Link>
    </Flex>
  );
};

export default HomePage;
