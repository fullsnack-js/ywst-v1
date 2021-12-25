export enum DeviceOrientationType {
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE",
}

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
  orientation: DeviceOrientationType;
}

export interface DeviceInfo {
  windowSize: DeviceWindow;
  orientation: DeviceOrientationType;
  isTouchDevice: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
export const getOrientationFromWindow = (window: any): DeviceOrientationType =>
  window.innerHeight > window.innerWidth
    ? DeviceOrientationType.PORTRAIT
    : DeviceOrientationType.LANDSCAPE;
