import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import data from "../../public/api/cars.json";

export const getServerSideProps = async () => {
  return { props: { data } };
};

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const dataObj = data.filter((d) => d.id === router.query.slug)[0];

  return (
    <div>
      <Link href="/">Home</Link>
      <div>
        Learn more about
        <h1>{dataObj.modelName}</h1>
        <p>
          The {dataObj.modelName} is a {dataObj.modelType} {dataObj.bodyType}
        </p>
        <Image
          src={dataObj.imageUrl}
          height={600}
          width={800}
          alt={`Side view of ${dataObj.modelName}`}
        />
      </div>
    </div>
  );
}
