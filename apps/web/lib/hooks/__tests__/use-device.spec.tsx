import { useContext } from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook, act } from "@testing-library/react-hooks";
import { clear as clearUserAgent, mockUserAgent } from "jest-useragent-mock";
import { useDevice } from "../use-device";

jest.mock("react", () => ({
  ...(jest.requireActual("react") as any),
  useContext: jest.fn(),
}));

const useContextFn = useContext as jest.Mock<any, any>;

describe("useDevice", () => {
  beforeEach(() => {
    useContextFn.mockClear();
    clearUserAgent();
  });

  it("should return valid DeviceContext when called without error", async () => {
    const context = {
      orientation: "LANDSCAPE",
      windowSize: {
        width: 1920,
        height: 1080,
      },
    };
    useContextFn.mockReturnValueOnce(context);

    const {
      result: { current },
    } = renderHook(() => useDevice());

    expect(current).toMatchObject({
      orientation: context.orientation,
      isPhone: false,
      isTablet: false,
      isDesktop: true,
      isTouchDevice: false,
      windowSize: context.windowSize,
    });
  });
});
