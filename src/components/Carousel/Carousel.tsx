import React, { useMemo } from 'react';
import { Flex, IconButton } from 'vcc-ui';
import useSwipeDistance from '../../hooks/useSwipe';
import styles from './Carousel.module.scss';

type CarouselProps = {
  items: React.ReactNode[];
  visibleItems: number;
  showArrows?: boolean;
  showDots?: boolean;
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const [index, setIndex] = React.useState(0);
  const [move, setMove] = React.useState(0);

  const lastIndex = useMemo(
    () => props.items.length - props.visibleItems,
    [props.items, props.visibleItems]
  );

  const prevSlide = () => {
    if (index === 0) {
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

  console.log({ index, lastIndex, vis: props.visibleItems });

  const { handleTouchEnd, handleTouchMove, handleTouchStart } =
    useSwipeDistance<HTMLDivElement>({
      threshold: 150,
      onSwipeRight: prevSlide,
      onSwipeLeft: nextSlide,
      onMove: setMove,
    });

  const translateX = useMemo(() => {
    const percent = index * (100 / props.visibleItems);
    return `translateX(calc(-${percent}% + ${move}px))`;
  }, [index, move, props.visibleItems]);

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
      {props.showArrows && (
        <Flex
          extend={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16 }}
        >
          <IconButton
            onClick={prevSlide}
            aria-label="Previous car"
            iconName="navigation-chevronback"
            variant="outline"
            disabled={index === 0}
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
