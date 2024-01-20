export function formatNumber(value: string | null) {
  if (!value) {
    return "-";
  }

  return parseFloat(String(value)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
}
