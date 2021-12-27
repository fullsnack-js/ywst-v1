import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  DeviceOrientationType,
  DeviceProviderProps,
  getOrientationFromWindow,
} from "./DeviceProvider.types";

import { isBrowser, useEnhancedEffect } from "../../../utils/guards";
import { DeviceContext } from "./DeviceContext";
const DEBOUNCE_MS = 100;

export const DeviceProvider = ({
  children,
  debounceTimeMs = DEBOUNCE_MS,
}: React.PropsWithChildren<DeviceProviderProps>) => {
  if (!isBrowser) {
    return null;
  }

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [orientation, setOrientation] = useState(
    window.innerHeight > window.innerWidth ? "PORTRAIT" : "LANDSCAPE"
  );

  const handleResize = useDebouncedCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setOrientation(getOrientationFromWindow(window));
  }, debounceTimeMs);
  const handleOrientation = useDebouncedCallback(() => {
    setOrientation(getOrientationFromWindow(window));
  }, debounceTimeMs);

  useEnhancedEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  });

  const deviceContext = {
    orientation,
    windowSize: { width, height },
  };
  return (
    <DeviceContext.Provider value={deviceContext}>
      {React.Children.toArray(children)}
    </DeviceContext.Provider>
  );
};
