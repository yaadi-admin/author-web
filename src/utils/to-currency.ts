export function toCurrency(
  number: number | string,
  disableDecimal = false,
  decimalPlaces = 0
) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: disableDecimal ? 0 : decimalPlaces,
    maximumFractionDigits: disableDecimal ? 0 : decimalPlaces,
  });
  return formatter.format(+number);
}
