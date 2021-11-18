const formatterMoney = (num: number) => {
  if (Number(num) < 10000) return num;
  const lookup = [
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const item = lookup.slice().reverse().find((item) => num >= item.value);
  return item ? (num / item.value).toFixed(1).replace(rx, '$1') + item.symbol : '0';
};
export default formatterMoney;
