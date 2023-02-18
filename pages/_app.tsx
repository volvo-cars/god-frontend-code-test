import '../public/css/styles.css';

import React from 'react';

import { HelloWorld } from '../src/components/HelloWorld';

function HomePage() {
  return (
    <React.StrictMode>
      <HelloWorld />
    </React.StrictMode>
  );
}

export default HomePage;
