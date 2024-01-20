import { Ticker24hUpdate } from "../components/MarketList/types";

export const calculateChange = (update: Ticker24hUpdate): string => {
  const { ask, bid, open } = update;

  if (!ask || !bid || !open) return "0";

  const openFloat = parseFloat(open);
  const midPrice = calculateMidPrice(parseFloat(bid), parseFloat(ask));

  return formatPercentage((midPrice - openFloat) / openFloat);
};

export const calculateMidPrice = (
  bidPrice: number,
  askPrice: number
): number => {
  return (bidPrice + askPrice) / 2;
};

export const formatPercentage = (change: number): string => {
  return (change * 100).toFixed(2);
};

export function getChangeClass(change: number): string {
  if (change < 0) return "red";
  if (change > 0) return "green";

  return "";
}

export function formatChange(change: number): string {
  if (change > 0) return `+ ${change}%`;
  if (change < 0) return `- ${Math.abs(change)}%`;
  return `${change}%`;
}

export function calculateChangeAndClass(marketUpdate: Ticker24hUpdate) {
  const change = calculateChange(marketUpdate);
  const changeNumber = parseFloat(change);

  return {
    change: formatChange(changeNumber),
    changeClass: getChangeClass(changeNumber),
  };
}
