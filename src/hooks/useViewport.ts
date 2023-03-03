import { useEffect, useMemo, useState } from 'react'
import { Format, SiteSettings } from '../types'

const breakpoints = {
  mobile: 480,
  desktop: 1024
}

const items: Record<Format, number> = {
  mobile: 1.3,
  tablet: 2,
  desktop: 4
}

export const useViewport = (): SiteSettings => {
  const [format, setFormat] = useState<Format>("desktop")
  const visibleCarouselItems = useMemo(() => items[format], [format]);

  useEffect(() => {
    const checkBreakpoint = () => {
      const ww = window.innerWidth;
      if (ww < breakpoints.mobile) {
        setFormat("mobile");
      } else if (ww > breakpoints.desktop) {
        setFormat("desktop");
      } else {
        setFormat("tablet");
      }
    };
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);

    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    }
  }, [])

  return { format, visibleCarouselItems };
}
