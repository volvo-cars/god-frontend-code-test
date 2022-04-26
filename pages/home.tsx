import React from "react";
import { View } from "vcc-ui";
import CarList from "../src/components/Carousel/CarList";

const Home: React.FC = () => {
  return (
    <>
      <header></header>
      <main>
        <article>
            <View extend={{
                overflow: "hidden",
            }}>
            <CarList />
            </View>

        </article>
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
