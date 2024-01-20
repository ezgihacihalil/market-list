import { formatNumber, formatCurrency } from "../index";

describe("formatting functions", () => {
  it("formatNumber", () => {
    expect(formatNumber(null)).toBe("-");
    expect(formatNumber("1234.5678")).toBe("1,234.57");
    expect(formatNumber("0")).toBe("0.00");
  });

  it("formatCurrency", () => {
    expect(formatCurrency(null)).toBe("-");
    expect(formatCurrency("1234.5678")).toBe("€1,234.57");
    expect(formatCurrency("0")).toBe("€0.00");
  });
});
