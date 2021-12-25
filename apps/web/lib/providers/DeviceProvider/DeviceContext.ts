import {
  DeviceContextType,
  DeviceOrientationType,
  getOrientationFromWindow,
} from "./DeviceProvider.types";
import React, { useContext } from "react";
import { isBrowser } from "@utils/guards";

const { PORTRAIT, LANDSCAPE } = DeviceOrientationType;

const DEFAULT_CONTEXT = {
  windowSize: {
    width: isBrowser ? window.innerWidth : 1920,
    height: isBrowser ? window.innerHeight : 1080,
  },
  orientation: isBrowser ? getOrientationFromWindow(window) : LANDSCAPE,
};

export const DeviceContext = React.createContext<DeviceContextType>({
  windowSize: {
    width: isBrowser ? window.innerWidth : 1920,
    height: isBrowser ? window.innerHeight : 1080,
  },
  orientation: isBrowser ? getOrientationFromWindow(window) : LANDSCAPE,
});

export const useDeviceContext = () => useContext(DeviceContext);
