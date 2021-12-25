/**
 * detects whether user is on mobile/tablet without relying on user agent strings
 * https://vhudyma-blog.eu/detect-mobile-device-in-react/
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 */

import { useEnhancedEffect } from "@utils/guards";
import { useState } from "react";

interface ReturnDeviceType {
  isTouchDevice: boolean;
}

export const useIsTouchDevice = (): ReturnDeviceType => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  if (typeof window === "undefined") {
    setIsTouchDevice(false);
  }
  useEnhancedEffect(() => {
    let hasTouchScreen = false;
    if (window.PointerEvent && "maxTouchPoints" in navigator) {
      // if Pointer Events are supported, just check maxTouchPoints
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else {
      const mQ = window.matchMedia && window.matchMedia("(any-pointer:coarse)");
      if (mQ && mQ.media === "(any-pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      setIsTouchDevice(true);
    } else {
      setIsTouchDevice(false);
    }
  }, []);

  return { isTouchDevice };
};
//  const userAgentString: string | undefined =
//     typeof window.navigator === "undefined" ? "" : navigator.userAgent;

//   useEffect(() => {
//     const mobile = Boolean(
//       userAgentString?.match(
//         /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
//       )
//     );
//     setMobile(mobile);
//   }, []);
