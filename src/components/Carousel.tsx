import useEmblaCarousel from "embla-carousel-react";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Flex, IconButton, Spacer } from "vcc-ui";
import styles from "../../styles/Dots.module.css";

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
  const [activeItem, setActiveItem] = useState("");
  const size = useWindowSize();
  const breakpoint = 500;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
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
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
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
      <div className="embla" ref={emblaRef}>
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
                onClick={() => scrollPrev()}
                variant="outline"
                iconName="navigation-chevronback"
                disabled={!emblaApi?.canScrollPrev()}
              />

              <IconButton
                onClick={() => scrollNext()}
                variant="outline"
                iconName="navigation-chevronforward"
                disabled={!emblaApi?.canScrollNext()}
              />
            </Flex>
          </>
        ) : (
          <>
            <Spacer></Spacer>
            <Flex
              extend={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              {data.map((item, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === selectedIndex ? styles.dotActive : ""
                  }`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </Flex>
          </>
        )}
      </div>
    </Flex>
  );
}
