import React, { useEffect, useState } from 'react';
import { Flex } from 'vcc-ui';
import CarInfo from '../CarInfo';
import { getAllCars, useGetCars, useGetTotalPages } from '../../logic';
import PaginationDesktop from '../Pagination/PaginationDesktop';
import { useRouter } from 'next/router';

export const CarsListDesktop: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { query } = useRouter();

  const filter = query.bodyType as string;
  const filteredCars = useGetCars(page, 4, filter?.toLowerCase());
  const carsData = filter ? filteredCars : getAllCars();
  const totalFilteredPages = useGetTotalPages(carsData, 4);

  const [totalPages, setTotalPages] = useState(totalFilteredPages);
  const [data, setData] = useState(carsData);

  useEffect(() => {
    setData(filteredCars);
    setTotalPages(totalFilteredPages);
  }, [page, query, filter, filteredCars, totalFilteredPages]);

  return (
    <>
      <Flex
        extend={{
          flexDirection: 'row',
          width: '100%',
          untilM: {
            display: 'none',
          },
          paddingTop: '16',
        }}
      >
        {data.map((car) => (
          <CarInfo car={car} key={car.id} />
        ))}
      </Flex>
      <PaginationDesktop
        setPage={setPage}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
};
