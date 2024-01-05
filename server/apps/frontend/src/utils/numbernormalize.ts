export const formatter = (number: number) => {
  const numFormatter = Intl.NumberFormat("en", {
    notation: "compact",
  });
  return numFormatter.format(number);
};
