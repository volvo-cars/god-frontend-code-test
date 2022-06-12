import * as React from "react";
import { SVGProps } from "react";

const SvgChevronSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m2 1.5 4 4-4 4"
      fill="none"
      stroke="#1c6bba"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgChevronSmall;
