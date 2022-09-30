import useEmblaCarousel from "embla-carousel-react";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Flex, IconButton, View } from "vcc-ui";
import { useWindowSize } from "../hooks/useWindowSize";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: "trimSnaps" });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setScrollSnaps(emblaApi.scrollSnapList());
    scrollTo(0);
  }, [emblaApi, data, scrollTo]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Flex
      extend={{
        flexWrap: "nowrap",
        alignItems: "center",
        margin: 15,
      }}
    >
      <section
        className="embla"
        ref={emblaRef}
        aria-labelledby="carouselheading"
      >
        <div className="embla__container">
          {data.map((item: T, index: number) => {
            return (
              <div key={index} className="embla__slide">
                {" "}
                {children(item)}
              </div>
            );
          })}
        </div>
        {size.width > breakpoint ? (
          data.length > itemsPerSlide ? (
            <>
              <Flex
                extend={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <IconButton
                  data-testid={"previous-image-button"}
                  onClick={() => scrollPrev()}
                  variant="outline"
                  iconName="navigation-chevronback"
                  disabled={!emblaApi?.canScrollPrev()}
                  aria-label={"Previous Image"}
                />

                <IconButton
                  data-testid={"next-image-button"}
                  onClick={() => scrollNext()}
                  variant="outline"
                  iconName="navigation-chevronforward"
                  disabled={!emblaApi?.canScrollNext()}
                  aria-label={"Next Image"}
                />
              </Flex>
            </>
          ) : (
            <></>
          )
        ) : (
          <>
            <Flex
              extend={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              {data.map((_item, index) => (
                <View
                  key={index}
                  extend={{
                    border: "1px solid black",
                    backgroundColor:
                      index === selectedIndex ? "black" : "transparent",
                    borderRadius: "15px",
                    width: "15px",
                    height: "15px",
                  }}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </Flex>
          </>
        )}
      </section>
    </Flex>
  );
}
