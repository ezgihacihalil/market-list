import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import MarketList from "../index";
import { marketData } from "../../../fixtures/marketData.ts";

describe("MarketList", () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(marketData),
      })
    );
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("renders without crashing", async () => {
    render(<MarketList />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument()
    );

    const items = screen.getAllByTestId("market-item");
    expect(items).toHaveLength(marketData.length);

    const firstItem = items[0];
    expect(within(firstItem).getByText("AAVE-EUR")).toBeInTheDocument();
    expect(within(firstItem).getByText("€95.38")).toBeInTheDocument();
    expect(within(firstItem).getByText("+ 1.28%")).toBeInTheDocument();
    expect(within(firstItem).getByText("1,187,385.04")).toBeInTheDocument();
  });

  it("displays an error message when fetch request fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Something went wrong"))
    );

    render(<MarketList />);

    await waitFor(() =>
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    );
  });
});
