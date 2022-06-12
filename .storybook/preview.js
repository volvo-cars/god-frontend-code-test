import { StyleProvider, ThemePicker } from "vcc-ui";
import * as NextImage from "next/image";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

/**
 * https://stackoverflow.com/a/68473603
 */
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const decorators = [
  (Story) => (
    <StyleProvider>
      <ThemePicker variant="light">
        <Story />
      </ThemePicker>
    </StyleProvider>
  ),
];
