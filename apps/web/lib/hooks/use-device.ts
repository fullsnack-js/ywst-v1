import { DeviceInfo, useDeviceContext } from "@lib/providers/DeviceProvider";
import { useMemo } from "react";
import { useIsTouchDevice } from "./use-is-touch";

export const useDevice = (): DeviceInfo => {
  const { orientation, windowSize } = useDeviceContext();
  const { isTouchDevice } = useIsTouchDevice();

  return useMemo(
    () => ({
      orientation,
      windowSize,
      isPhone: windowSize.width < 450,
      isTablet: windowSize.width >= 450 && windowSize.width <= 850,
      isDesktop: windowSize.width > 850,
      isTouchDevice,
    }),
    [orientation, windowSize, isTouchDevice]
  );
};
