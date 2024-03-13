import React from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { links } from "@volvo-cars/css/links";

import Layout from "../src/components/layout";

function HomePage({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VC GOD Home assignment</title>
        
        {links().map((link) => (
          <link key={link.href} {...link} />
        ))}
      </Head>
      <React.StrictMode>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.StrictMode>
    </>
  );
}

export default HomePage;
