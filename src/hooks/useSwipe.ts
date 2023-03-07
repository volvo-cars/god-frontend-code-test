import React, { useState } from 'react';

const SWIPE_SPEED_MULTIPLIER = 1;

type useSwipeProps = {
  /**
   * The threshold in pixels that the user has to swipe before the callback is called.
   */
  threshold: number;
  /**
   * event handler for when the user swipes left
   */
  onSwipeLeft: () => void;
  /**
   * event handler for when the user swipes right
   */
  onSwipeRight: () => void;
  /**
   * callback function with the distance the user has swiped as `distance`
   */
  onMove: (distance: number) => void;
}

const useSwipe = <T>(props: useSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  /**
   * Handle touch start event and set the touch start position
   * @param e the touch event
   */
  const handleTouchStart = (e: React.TouchEvent<T>) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Handles touch move event and calculates the distance between the touch start and touch end.
   * @param e the touch event
   */
  const handleTouchMove = (e: React.TouchEvent<T>) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = e.targetTouches[0].clientX - touchStart;
    props.onMove(diff * SWIPE_SPEED_MULTIPLIER)
  };

  /**
   * Handles touch end event and calls the appropriate callback
   * depending on the distance between the touch start and touch end position.
   */
  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd
    if (diff > props.threshold) {
      props.onSwipeLeft();
    }

    if (diff < -props.threshold) {
      props.onSwipeRight();
    }

    setTouchStart(0)
    setTouchEnd(0);
    props.onMove(0);
  };

  return {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  };
};

export default useSwipe;
