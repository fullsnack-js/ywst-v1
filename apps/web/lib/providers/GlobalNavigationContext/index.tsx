import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { useRouter } from "next/router";

interface FullscreenNavContextValue {
  isOpen: boolean;
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
}

export const FullscreenNavContext = React.createContext({
  isOpen: false,
} as FullscreenNavContextValue);

export function useFullscreenNavContext() {
  const value = useContext(FullscreenNavContext);
  return value;
}

type FullscreenNavProviderProps = React.PropsWithChildren<unknown>;

function FullscreenNavProvider({ children }: FullscreenNavProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const router = useRouter();

  // close when route change is completed
  useEffect(() => {
    const eventType = "routeChangeComplete";

    router.events.on(eventType, close);

    return () => {
      router.events.off(eventType, close);
    };
  }, [close, router.events]);

  const contextValue = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle]
  );

  return (
    <>
      <FullscreenNavContext.Provider value={contextValue}>
        {children}
      </FullscreenNavContext.Provider>
    </>
  );
}

export default FullscreenNavProvider;
