export const roundPercent = (num1, num2) => {
  return (100 - (num1 / num2) * 100).toString().slice(0, 4);
};

export const byteConverter = (num) => {
  switch (num > 0) {
    case num >= 1024 && num < 1048576:
      const mb = num / 1024;
      return `${mb}KB`;
    case num >= 1048576 && num < 1073741824:
      const gb = num / 1048576;
      return `${gb}MB`;
    default:
      return num;
  }
};
