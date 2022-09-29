import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardContent, Link, Spacer, Text, View } from "vcc-ui";

const Learn = () => {
  const router = useRouter();
  const { modelName } = router.query;

  return (
    <>
      <Head>
        <title>{modelName}</title>
      </Head>

      <View>
        <Text>{modelName}</Text>
      </View>
    </>
  );
};

export default Learn;
