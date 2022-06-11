import { useEffect } from "react";

export default function useScreenResize(
  callback: (screenSize: { width: number; height: number }) => void
) {
  useEffect(() => {
    function handleResize() {
      callback({ width: window.innerWidth, height: window.innerHeight });
    }

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);
}
