import {
  calculateChange,
  calculateMidPrice,
  formatPercentage,
  getChangeClass,
  formatChange,
  calculateChangeAndClass,
} from "../change";
import { Ticker24hUpdate } from "../../components/MarketList/types";

describe("change calculations", () => {
  const mockUpdate: Ticker24hUpdate = {
    market: "1INCH-EUR",
    timestamp: 1705429135247,
    open: "0.42599",
    high: "0.43906",
    low: "0.41",
    last: "0.43286",
    bid: "0.43297",
    bidSize: "664.1",
    ask: "0.43415",
    askSize: "2299.2",
    volume: "184819.02897769",
    volumeQuote: "78483.1016723091783",
  };

  it("calculateChange", () => {
    expect(calculateChange(mockUpdate)).toBe("1.78");
  });

  it("calculateMidPrice", () => {
    expect(calculateMidPrice(1, 2)).toBe(1.5);
  });

  it("formatPercentage", () => {
    expect(formatPercentage(0.01)).toBe("1.00");
  });

  it("getChangeClass", () => {
    expect(getChangeClass(-1)).toBe("red");
    expect(getChangeClass(1)).toBe("green");
    expect(getChangeClass(0)).toBe("");
  });

  it("formatChange", () => {
    expect(formatChange(-1)).toBe("- 1%");
    expect(formatChange(1)).toBe("+ 1%");
    expect(formatChange(0)).toBe("0%");
  });

  it("calculateChangeAndClass", () => {
    expect(calculateChangeAndClass(mockUpdate)).toEqual({
      change: "+ 1.78%",
      changeClass: "green",
    });
  });
});
