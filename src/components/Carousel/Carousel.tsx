import React, { useEffect, useMemo } from 'react';
import { Flex, IconButton } from 'vcc-ui';
import useSwipe from '../../hooks/useSwipe';
import IndicatorDot from '../IndicatorDot/IndicatorDot';
import styles from './Carousel.module.scss';

type CarouselProps = {
  items: React.ReactNode[];
  visibleItems: number;
  showArrows?: boolean;
  showDots?: boolean;
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const prevLastIndex = React.useRef<number>(0);
  const [index, setIndex] = React.useState(0);
  const [move, setMove] = React.useState(0);

  const lastIndex = useMemo(
    () => Math.max(0, props.items.length - props.visibleItems),
    [props.items.length, props.visibleItems]
  );

  /**
   * If the length of items has changed make sure the index is not out of bounds
   */
  useEffect(() => {
    if (lastIndex < prevLastIndex.current) {
      setIndex(Math.round(lastIndex));
    }
    prevLastIndex.current = lastIndex;
  }, [lastIndex]);

  const prevSlide = () => {
    if (index <= 0) {
      return;
    }
    setIndex(index - 1);
  };

  const nextSlide = () => {
    if (index >= lastIndex) {
      return;
    }
    setIndex(index + 1);
  };

  const { handleTouchEnd, handleTouchMove, handleTouchStart } =
    useSwipe<HTMLDivElement>({
      threshold: 75,
      onSwipeRight: prevSlide,
      onSwipeLeft: nextSlide,
      onMove: setMove,
    });

  const translateX = useMemo(() => {
    const percent = index * (100 / props.visibleItems);
    return `translateX(calc(-${percent}% + ${move}px))`;
  }, [index, move, props.visibleItems]);

  console.log(translateX);

  return (
    <>
      <div className={styles.horizontalScroll}>
        <div
          className={styles.inner}
          style={{
            transform: translateX,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {props.items}
        </div>
      </div>
      {props.showDots && (
        <Flex
          extend={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}
        >
          {Array.from(props.items).map((_, i) => (
            <IndicatorDot
              index={i}
              active={i === index}
              key={`indicator-dot-${i}`}
              setIndex={setIndex}
            />
          ))}
        </Flex>
      )}
      {props.showArrows && (
        <Flex
          extend={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16 }}
        >
          <IconButton
            onClick={prevSlide}
            aria-label="Previous car"
            iconName="navigation-chevronback"
            variant="outline"
            disabled={index <= 0}
          />
          <IconButton
            onClick={nextSlide}
            aria-label="Next car"
            iconName="navigation-chevronforward"
            variant="outline"
            disabled={index >= lastIndex}
          />
        </Flex>
      )}
    </>
  );
};

export default Carousel;
