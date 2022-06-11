import { StyleProvider, ThemePicker } from "vcc-ui";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <StyleProvider>
      <ThemePicker variant="light">
        <Story />
      </ThemePicker>
    </StyleProvider>
  ),
];
