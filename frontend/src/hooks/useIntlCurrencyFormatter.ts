export function useIntlCurrencyFormatter() {
  return {
    fmt: (number: number, options: { currency: string }) =>
      new Intl.NumberFormat("en", { style: "currency", currency: options.currency }).format(number),
  };
}
