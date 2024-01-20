import { useMemo, useState } from "react";
import Icon from "../Icon";
import { REST_API_URL, WEBSOCKET_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import useWebSocket from "../../hooks/useWebSocket";
import { formatCurrency, formatNumber } from "../../utils";

import rightArrow from "../../assets/right-arrow.svg";
import style from "./style.module.css";
import ChangeDisplay from "../ChangeDisplay";
import SearchInput from "../SearchInput";
import useSort from "../../hooks/useSort";
import TableHeader from "../TableHeader";
import { calculateChange } from "../../utils/change";
import { columnTitles } from "./constants";
import { Ticker24hUpdate } from "./types";

import SkeletonList from "../Skeleton";

const MarketList = () => {
  const {
    data: marketList,
    loading,
    error,
  } = useFetch<Ticker24hUpdate[]>(`${REST_API_URL}ticker/24h`);

  const { data: updatedMarketList } = useWebSocket(WEBSOCKET_URL);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkets: Ticker24hUpdate[] = useMemo(() => {
    return (marketList || [])
      .filter((item) =>
        item.market.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((market) => {
        const change = calculateChange(market);

        return { ...market, change };
      });
  }, [marketList, searchTerm]);

  const { sortedData, handleSort, sortConfig } = useSort(
    {
      key: "volumeQuote",
      direction: "desc",
    },
    filteredMarkets
  );

  if (error) return <div className={style.error}>{error?.message}</div>;

  return (
    <div className={style.marketList}>
      <div className={style.inputWrapper}>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={style.container}>
        <TableHeader
          columnTitles={columnTitles}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />

        {loading ? (
          <SkeletonList />
        ) : (
          sortedData.map((item) => {
            const iconName = item.market.split("-")[0].toLowerCase();
            const updatedMarket = updatedMarketList[item.market] || item;

            return (
              <div
                key={item.market}
                className={style.tableRow}
                data-testid="market-item"
              >
                <div className={style.brandName}>
                  <Icon name={iconName} width={24} height={24} />
                  <div className={style.market}>{updatedMarket.market}</div>
                </div>
                <div>{formatCurrency(updatedMarket.last)}</div>
                <ChangeDisplay data={updatedMarket} />
                <div>{formatNumber(updatedMarket.volumeQuote)}</div>
                <button className={style.buy}>
                  <span>Buy</span>
                  <img className={style.rightArrow} src={rightArrow} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MarketList;
