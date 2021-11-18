type Price = {
  size: string,
  averagePrice: number,
  lowestPrice: number
};

type Prices = Price[];

const averagePrices: Prices = [
  {
    size: "5'x5'",
    averagePrice: 62,
    lowestPrice: 7,
  },
  {
    size: "5'x10'",
    averagePrice: 180,
    lowestPrice: 59,
  },
  {
    size: "10'x10'",
    averagePrice: 195,
    lowestPrice: 122,
  },
  {
    size: "10'x15'",
    averagePrice: 434,
    lowestPrice: 236,
  },
  {
    size: "10'x20'",
    averagePrice: 0,
    lowestPrice: 299,
  },
];

export default averagePrices;
