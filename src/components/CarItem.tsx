import Image from "next/image";
import { Flex, Link, Row, Text } from "vcc-ui";
import { Car } from "../../types/Car";
import styles from "../../styles/CarCard.module.css";
import { useWindowSize } from "../hooks/useWindowSize";
interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  const size = useWindowSize();

  return (
    <Flex extend={{ minWidth: 300 }}>
      <div>
        <Text subStyle="inline-link">
          <b>{car.bodyType}</b>
        </Text>
      </div>
      <Flex
        extend={{
          flexDirection: size.width < 500 ? "column" : "row",
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
    </Flex>
  );
};
