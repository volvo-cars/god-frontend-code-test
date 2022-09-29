import { useSpringCarousel } from "react-spring-carousel";
import { ReactElement } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Flex, IconButton } from "vcc-ui";
import Image from "next/image";
interface CarouselProps<T> {
  data: T[];
  children(data: T): ReactElement;
  itemsPerSlide?: number;
}

export function Carousel<T extends any>({
  data,
  children,
  itemsPerSlide = 1,
}: CarouselProps<T>) {
  const size = useWindowSize();
  const breakpoint = 500;

  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      gutter: 24,
      itemsPerSlide: itemsPerSlide,
      items: data.map((item: T, index: number) => ({
        id: index.toString(),
        renderItem: children(item),
      })),
    });

  return (
    <Flex
      extend={{
        overflow: "hidden",
        flexWrap: "nowrap",
      }}
    >
      <Flex>{carouselFragment}</Flex>
      {size.width > breakpoint ? (
        <>
          <Flex
            extend={{
              flexDirection: "row",
              alignSelf: "flex-end",
              gap: 10,
            }}
          >
            <IconButton
              onClick={slideToPrevItem}
              variant="outline"
              iconName="navigation-chevronback"
            />

            <IconButton
              onClick={slideToNextItem}
              variant="outline"
              iconName="navigation-chevronforward"
            />
          </Flex>
        </>
      ) : (
        <>
          <Flex
            extend={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {data.map((item, index) => (
              <Image
                key={index}
                src="/images/chevron-circled.svg"
                width={50}
                height={50}
              />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
}
