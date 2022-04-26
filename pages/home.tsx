import React from "react";
import { Text, View } from "vcc-ui";
import CarList from "../src/components/Carousel";

const Home: React.FC = () => {
  return (
    <>
      <header style={{ textAlign: "center" }}>
        <Text variant={"cook"}>Volvo</Text>
      </header>
      <main>
        <article>
          <View
            extend={{
              overflow: "hidden"
            }}
          >
            <CarList />
          </View>
        </article>
      </main>
      <footer style={{ textAlign: "center" }}>
        <Text>2022 Volvo Car Corporation</Text>
      </footer>
    </>
  );
};

export default Home;
