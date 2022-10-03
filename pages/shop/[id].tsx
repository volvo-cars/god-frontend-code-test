import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSwr from "swr";
import { Text, View } from "vcc-ui";
import { Car } from "../../types/Car";
import { fetcher } from "../../utils/fetcher";

const Shop = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSwr<Car>(`/api/cars/${id}`, fetcher);

  if (!data) return <div>Car not found...</div>;

  return (
    <>
      <Head>
        <title>Volvo - Shop - {data.modelName}</title>
      </Head>

      <View>
        <Text>{data.modelName}</Text>
        <Image
          src={data.imageUrl}
          alt={data.modelName}
          width="50%"
          height="50%"
          layout="fill"
          objectFit="contain"
        ></Image>
      </View>
    </>
  );
};

export default Shop;
