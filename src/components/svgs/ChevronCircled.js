import * as React from "react";

const SvgChevronCircled = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" {...props}>
    <circle cx={20} cy={20} r={18.5} fill="#fff" stroke="#333" />
    <rect
      x={24.914}
      y={20.346}
      width={10.491}
      height={0.5}
      rx={0.25}
      transform="rotate(-135 24.914 20.346)"
      fill="none"
      stroke="#333"
    />
    <rect
      x={17.494}
      y={27.07}
      width={10.476}
      height={0.5}
      rx={0.25}
      transform="rotate(-45 17.494 27.07)"
      fill="none"
      stroke="#333"
    />
  </svg>
);

export default SvgChevronCircled;
