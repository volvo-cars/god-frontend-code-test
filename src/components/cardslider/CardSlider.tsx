import { RefObject, useEffect, useRef, useState } from "react";
import { Car } from "../../models/car";
import CarCard from "./CarCard";
import styles from "./CardSlider.module.css";
import SlideButton from "./SlideButton";
import Dots, { DotsProps } from "./dots/Dots";

export type CardSliderProps = {
  cars: Car[];
  height?: string | number;
};

const CardSlider = (props: CardSliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [dots, setDots] = useState<DotsProps>({
    size: 1,
    current: 0,
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
    const calculateDots = () => {
      if (sliderRef?.current) {
        let scrollWidth = sliderRef.current.scrollWidth;
        let width = parseInt(getComputedStyle(sliderRef.current).width);
        var item_size = sliderRef?.current?.firstElementChild
          ? parseInt(getComputedStyle(sliderRef.current.firstElementChild).width)
          : 300;
        let size = Math.ceil((scrollWidth - width) / item_size);
        let current = Math.floor(sliderRef.current.scrollLeft / item_size);
        setDots({
          size: size,
          current: current,
        });
      }
    };

    const updateSliderFooter = (slider: HTMLElement) => {
    
      let computedSlider = getComputedStyle(slider);
      let sWidth = parseInt(computedSlider.width);
  
      //did it scroll to end
      setNextDisabled(slider.scrollWidth <= sWidth + slider.scrollLeft);
      //did it scroll to start
      setPrevDisabled(slider.scrollLeft <= 0);
  
      //calculate dot indicators
      calculateDots();
    };

    if (sliderRef?.current) {
      sliderRef.current.addEventListener("scrollend", (e) => {
        e.preventDefault();

        let slider = e.target as HTMLElement;
        updateSliderFooter(slider);
      });

      updateSliderFooter(sliderRef.current);
    }
  }, [props.cars]);

  return (
    <div className={styles.sliderContainer} style={{ height: props.height }}>
      <div ref={sliderRef} className={styles.slider}>
        {props.cars.map((car) => (
          <CarCard key={car.id} car={car}></CarCard>
        ))}
      </div>
      <div className={`${styles.buttons} ${styles.justifyLeft}`}>
        <Dots size={dots?.size} current={dots?.current} />
        <SlideButton
          isDisabled={prevDisabled}
          iconName="navigation-chevronback"
          areaLabel="Scroll Previous"
          onClick={() => scroll(false)}
        />

        <SlideButton
          isDisabled={nextDisabled}
          iconName="navigation-chevronforward"
          areaLabel="Scroll Next"
          onClick={() => scroll(true)}
        />
      </div>
    </div>
  );
};

export default CardSlider;
