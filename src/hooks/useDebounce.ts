import { useCallback, useEffect, useRef } from 'react';

/**
 * This hook allows you to debounce any fast changing value
 * @param fn: callback function
 * @param delay: milliseconds
 * @param dep
 */
export default function useDebounce(fn: Function, delay: number, dep = []) {
  const { current } = useRef<{ fn: Function; timer: NodeJS.Timeout | null }>({
    fn,
    timer: null,
  });

  useEffect(() => {
    current.fn = fn;

    return () => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
    };
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.fn(...args);
    }, delay);
  }, dep);
}
