export const roundPercent = (num1, num2) => {
  return (100 - (num1 / num2) * 100).toString().slice(0, 4);
};

export const byteConverter = (num) => {
  switch (num > 0) {
    case num >= 1000 && num < 1000000:
      const mb = num / 1000;
      return `${mb}KB`;
    case num >= 1000000 && num < 1000000000:
      const gb = num / 1000000;
      return `${gb}MB`;
    default:
      return num;
  }
};
