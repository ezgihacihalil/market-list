// useSort.ts
import { useState, useMemo } from "react";
import { Ticker24hUpdate } from "../components/MarketList/types";

export type SortConfig = {
  key: keyof Ticker24hUpdate;
  direction: "asc" | "desc";
};

const useSort = (initialSortConfig: SortConfig, data: Ticker24hUpdate[]) => {
  const [sortConfig, setSortConfig] = useState(initialSortConfig);

  function sortMarkets(
    markets: Ticker24hUpdate[],
    sortField: keyof Ticker24hUpdate,
    sortDirection: SortConfig["direction"]
  ) {
    return [...markets].sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      const aValueFloat = parseFloat(aValue as string);
      const bValueFloat = parseFloat(bValue as string);

      if (!isNaN(aValueFloat) && !isNaN(bValueFloat)) {
        return sortDirection === "asc"
          ? aValueFloat - bValueFloat
          : bValueFloat - aValueFloat;
      } else {
        return sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    });
  }

  const handleSort = (key: keyof Ticker24hUpdate) => {
    const direction: SortConfig["direction"] =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(
    () => sortMarkets(data, sortConfig.key, sortConfig.direction),
    [data, sortConfig]
  );

  return { sortedData, handleSort, sortConfig };
};

export default useSort;
