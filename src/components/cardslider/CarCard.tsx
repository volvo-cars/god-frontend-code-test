import { Car } from "../../models/car";
import styles from "./CarCard.module.css";
import { Block, Text, Spacer, Link, useTheme } from "vcc-ui";
import Image from "next/image";

export type CarCardProps = {
  car: Car;
};
const CarCard = (props: CarCardProps) => {
  return (
    <div className={styles.card}>
      <Block extend={{ textAlign: "left" }}>
        <Text fg="foreground.secondary" subStyle="emphasis">
          {props.car.bodyType.toLocaleUpperCase()}
        </Text>
        <Block
          extend={{
            "@media (min-width: 1024px)": {
              display: "flex",
              gap: "8px",
            },
          }}
        >
          <Text subStyle="emphasis"> {props.car.modelName}</Text>
          <Text fg="foreground.secondary"> {props.car.modelType}</Text>
        </Block>
      </Block>
      <Spacer />
      <Image
        src={props.car.imageUrl}
        alt={"Image for the car " + props.car.modelName}
        width={"100%"}
        height={"90%"}
        layout="responsive"
        priority={true}
        className={styles.image}
      ></Image>
      <Spacer />
      <Block
        extend={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href={"/learn/" + props.car.id} arrow="right">
          LEARN
        </Link>
        <Link href={"/shop/" + props.car.id} arrow="right">
          SHOP
        </Link>
      </Block>
    </div>
  );
};

export default CarCard;
