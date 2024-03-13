import { useRef, useState } from "react";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { useReel } from "@volvo-cars/react-headless";

import ProductCard from "@components/productCard";
import ReelIndicator from "@components/reelIndicator";

import data from "../public/api/cars.json";

export const getServerSideProps = async () => {
  return { props: { data } };
};

export default function Page({
  data: productData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const reelRef = useRef(null);

  const { activeIndex, indicatorCount, previousButtonProps, nextButtonProps } =
    useReel({ ref: reelRef });

  const [filter, setFilter] = useState<String>("");

  const filterCritera = () => [...new Set(productData.map((d) => d.bodyType))];

  const toggleFilter = (value: String) => {
    if (filter && filter === value) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  return (
    <div>
      <section className="flex">
        <div>Filter:</div>
        <div className="flex gap-4 ml-4">
          {filterCritera().map((criterion) => (
            // TODO Remove inline styling
            <p
              className={filter === criterion ? "font-medium" : "font-light"}
              style={{ cursor: "pointer" }}
              onClick={() => toggleFilter(criterion)}
              key={criterion}
            >
              {criterion}
            </p>
          ))}
        </div>
      </section>

      <div className="flex-col">
        <div
          className="container-max reel scrollbar-none gap-x-gutter py-16 px-pagemargin lg:px-0"
          ref={reelRef}
        >
          {productData
            .filter((product) =>
              filter ? product.bodyType === filter : product
            )
            .map((data) => (
              <ProductCard {...data} key={data.id} />
            ))}
        </div>

        <ReelIndicator
          {...{
            indicatorCount,
            activeIndex,
            previousButtonProps,
            nextButtonProps,
          }}
        />
      </div>
    </div>
  );
}
