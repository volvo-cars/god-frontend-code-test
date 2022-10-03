import Head from "next/head";
import { useRouter } from "next/router";
import useSwr from "swr";
import { Text, View } from "vcc-ui";
import { Car } from "../../types/Car";
import { fetcher } from "../../utils/fetcher";

const Learn = () => {
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
      </View>
    </>
  );
};

export default Learn;
