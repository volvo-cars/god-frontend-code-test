import { styleRenderer } from "vcc-ui";

const resetStyleRender = styleRenderer();

resetStyleRender.renderStatic(
  {
    margin: 0,
    padding: 0,
    backgroundColor: "white",
  },
  "body"
);
resetStyleRender.renderStatic(
  {
    paddingInlineStart: 0,
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  "ul"
);

export default resetStyleRender;
