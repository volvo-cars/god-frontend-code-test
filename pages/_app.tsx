import "../src/styles/_main.scss";
import "./_app.scss";
import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import { CarView } from "../src/views/CarView";

function App() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <main role="main" className="home">
            <CarView />
          </main>
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default App;
