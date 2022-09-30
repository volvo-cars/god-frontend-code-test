import Image from "next/image";
import { Flex, Link, Row, Text } from "vcc-ui";
import { Car } from "../../types/Car";
import styles from "../../styles/CarCard.module.css";
interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  return (
    <article className={styles.wrapper}>
      <div>
        <Text subStyle="inline-link">
          <b>{car.bodyType}</b>
        </Text>
      </div>
      <Flex
        extend={{
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Text subStyle="emphasis">
          <b>{car.modelName}</b>
        </Text>
        <Text subStyle="inline-link">{car.modelType}</Text>
      </Flex>
      <div>
        <Image
          src={car.imageUrl}
          alt={car.modelName}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        ></Image>
      </div>
      <Row align="center">
        <Link
          href={`/learn/${car.id}`}
          arrow="right"
          style={{ margin: "0 1rem" }}
        >
          Learn
        </Link>
        <Link
          href={`/shop/${car.id}`}
          arrow="right"
          style={{ margin: "0 1rem" }}
        >
          Shop
        </Link>
      </Row>
    </article>
  );
};
