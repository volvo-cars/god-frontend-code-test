import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Text, View } from "vcc-ui";
import { getCarById } from "../../public/api/cars";

const Learn = () => {
  const router = useRouter();
  const { id } = router.query;

  const car = getCarById(id);

  if (!car) return <div>Car not found...</div>;

  return (
    <>
      <Head>
        <title>Volvo - Learn - {car.modelName}</title>
      </Head>

      <View>
        <Text>{car.modelName}</Text>
        <Image
          src={car.imageUrl}
          alt={car.modelName}
          width="50%"
          height="50%"
          layout="fill"
          objectFit="contain"
        ></Image>
      </View>
    </>
  );
};

export default Learn;
