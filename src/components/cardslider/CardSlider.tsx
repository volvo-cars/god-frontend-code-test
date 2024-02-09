import {
  RefObject,
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Car } from "../../models/car";
import CarCard from "./CarCard";
import styles from "./CardSlider.module.css";
import SlideButton from "./SlideButton";
import Dots, { DotsProps } from "./dots/Dots";
import { useDebounce } from "../../hooks/useDebounce";
import SliderHandler, { SliderResult } from "../../util/sliderHandler";

export type CardSliderProps = {
  cars: Car[];
  height?: string | number;
};

const CardSlider = (props: CardSliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [slider, setSlider] = useState<SliderResult>({
    current: 0,
    size: 1,
    isNextBtnDisabled: false,
    isPrevBtnDisabled: true,
  });

  const scroll = (forward: boolean) => {
    if (sliderRef?.current && sliderRef.current.firstElementChild) {
      var item_size = parseInt(
        getComputedStyle(sliderRef.current.firstElementChild).width
      );

      sliderRef.current.scrollLeft += forward ? item_size : -item_size;
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      SliderHandler(sliderRef.current, setSlider);
    }
  }, [props.cars]);

  return (
    <div
      className={styles.sliderContainer}
      style={{ height: props.height }}
      role="heading"
      aria-level={1}
    >
      <div
        ref={sliderRef}
        className={styles.slider}
        onScroll={useDebounce(() =>
          sliderRef.current ? SliderHandler(sliderRef.current, setSlider) : null
        )}
        role="list"
      >
        {props.cars.map((car) => (
          <CarCard key={car.id} car={car}></CarCard>
        ))}
      </div>

      <div className={`${styles.buttons}`}>
        <div className={styles.dots}>
          <Dots size={slider.size} current={slider.current} />
        </div>
        <div className={`${styles.buttons} ${styles.slide}`}>
          <SlideButton
            isDisabled={slider.isPrevBtnDisabled}
            iconName="navigation-chevronback"
            areaLabel="Scroll Previous"
            onClick={() => scroll(false)}
          />

          <SlideButton
            isDisabled={slider.isNextBtnDisabled}
            iconName="navigation-chevronforward"
            areaLabel="Scroll Next"
            onClick={() => scroll(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
