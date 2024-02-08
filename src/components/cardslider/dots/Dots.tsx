import Dot from "./Dot";

export type DotsProps = {
  size: number;
  current: number;
};

const Dots = (props: DotsProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {[...Array(props.size)].map((_, i) => <Dot key={i} isActive={i == props.current}></Dot>)}
    </div>
  );
};
export default Dots;

