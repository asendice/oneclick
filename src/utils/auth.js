export const roundPercent = (num1, num2) => {
  return ((num1 / num2) * 100).toString().slice(0, 4);
};
