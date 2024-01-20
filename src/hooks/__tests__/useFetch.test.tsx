import { renderHook } from "@testing-library/react-hooks";
import useFetch from "../useFetch";

describe("useFetch", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });
  it("fetches data successfully", async () => {
    const mockSuccessResponse = { message: "Success" };
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ message: "Success" });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    (global.fetch as jest.Mock).mockRestore();
  });

  it("handles fetch error", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error("Fetch failed")));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    await waitForNextUpdate();

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error("Fetch failed"));

    (global.fetch as jest.Mock).mockRestore();
  });
});
