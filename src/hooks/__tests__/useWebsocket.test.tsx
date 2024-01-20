import { renderHook, act } from "@testing-library/react-hooks";
import useWebSocket from "../useWebSocket";

describe("useWebSocket", () => {
  let mockWebSocket: any;
  let originalWebSocket: any;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    originalWebSocket = global.WebSocket;
    mockWebSocket = { send: jest.fn(), close: jest.fn() };
    global.WebSocket = jest.fn(() => mockWebSocket) as any;
  });

  afterEach(() => {
    global.WebSocket = originalWebSocket;
  });

  it("should open a WebSocket connection on mount", () => {
    renderHook(() => useWebSocket("ws://localhost:1234"));

    expect(global.WebSocket).toHaveBeenCalledWith("ws://localhost:1234");
  });

  it("should send a message when WebSocket connection is opened", () => {
    renderHook(() => useWebSocket("ws://localhost:1234"));

    act(() => {
      mockWebSocket.onopen();
    });

    expect(mockWebSocket.send).toHaveBeenCalled();
  });

  it("should close the WebSocket connection on unmount", () => {
    const { unmount } = renderHook(() => useWebSocket("ws://localhost:1234"));

    unmount();

    expect(mockWebSocket.close).toHaveBeenCalled();
  });

  it("should update data when a message is received", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useWebSocket("ws://localhost:1234")
    );

    await act(async () => {
      mockWebSocket.onmessage({
        data: JSON.stringify({
          event: "ticker24h",
          data: [{ market: "BTC-USD", last: "50000" }],
        }),
      });

      await waitForNextUpdate();
    });

    expect(result.current.data).toEqual({
      "BTC-USD": { market: "BTC-USD", last: "50000" },
    });
  });
});
