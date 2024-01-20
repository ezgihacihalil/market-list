import { renderHook, act } from "@testing-library/react-hooks";
import useSort, { SortConfig } from "../useSort";
import { Ticker24hUpdate } from "../../components/MarketList/types";
import { marketData } from "../../fixtures/marketData";

describe("useSort", () => {
  const initialSortConfig: SortConfig = {
    key: "market",
    direction: "asc",
  };

  const data: Ticker24hUpdate[] = marketData;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("should sort data in ascending order by default", () => {
    const { result } = renderHook(() => useSort(initialSortConfig, data));

    expect(result.current.sortedData.map((item) => item.market)).toEqual([
      "1INCH-EUR",
      "AAVE-EUR",
      "ACH-EUR",
    ]);
  });

  it("should sort data in descending order when handleSort is called", () => {
    const { result } = renderHook(() => useSort(initialSortConfig, data));

    act(() => {
      result.current.handleSort("market");
    });

    expect(result.current.sortedData.map((item) => item.market)).toEqual([
      "ACH-EUR",
      "AAVE-EUR",
      "1INCH-EUR",
    ]);
  });

  it("should update sortConfig when handleSort is called", () => {
    const { result } = renderHook(() => useSort(initialSortConfig, data));

    act(() => {
      result.current.handleSort("last");
    });

    expect(result.current.sortConfig).toEqual({
      key: "last",
      direction: "asc",
    });
  });
});
