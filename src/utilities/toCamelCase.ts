const toCamelCase = (inputStr: string): string => inputStr.split(' ').map((str, i) => {
  if (i === 0) return str.slice(0, 1).toLowerCase().concat(str.slice(1, str.length));
  return str.slice(0, 1).toUpperCase().concat(str.slice(1, str.length));
}).join('');

export default toCamelCase;
