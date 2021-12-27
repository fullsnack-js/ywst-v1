import {
  DeviceContextType,
  DeviceOrientationType,
} from "./DeviceProvider.types";
import React, { useContext } from "react";
import { isBrowser } from "../../../utils/guards";
const getOrientationFromWindow = () =>
  window.innerHeight > window.innerWidth ? "PORTRAIT" : "LANDSCAPE";
const DEFAULT_CONTEXT = {
  windowSize: {
    width: isBrowser ? window.innerWidth : 1920,
    height: isBrowser ? window.innerHeight : 1080,
  },
  orientation: isBrowser ? getOrientationFromWindow() : "LANDSCAPE",
};

export const DeviceContext =
  React.createContext<DeviceContextType>(DEFAULT_CONTEXT);

export const useDeviceContext = () => useContext(DeviceContext);
