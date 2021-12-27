export type DeviceOrientationType = "PORTRAIT" | "LANDSCAPE";

export enum DeviceType {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
}

export interface DeviceWindow {
  width: number;
  height: number;
}

export interface DeviceProviderProps {
  debounceTimeMs?: number;
}

export interface DeviceContextType {
  windowSize: DeviceWindow;
  orientation: string;
}

export interface DeviceInfo {
  windowSize: DeviceWindow;
  orientation: string;
  isTouchDevice: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
export const getOrientationFromWindow = (window: any): DeviceOrientationType =>
  window.innerHeight > window.innerWidth ? "PORTRAIT" : "LANDSCAPE";
