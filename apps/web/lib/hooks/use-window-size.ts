import { useEffect, useState } from "react";

export interface WindowDimensions {
  width: number;
  height: number;
}
export function useWindowSize(): WindowDimensions {
  function getSize(): WindowDimensions {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    // Set size at the first client-side load
    handleResize();

    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}

// export default useWindowSize;
