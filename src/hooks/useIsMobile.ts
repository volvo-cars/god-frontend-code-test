import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  // Potential improvement:
  // Listen to resize event, redo logic in a debounced fashion

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return { isMobile }
}
