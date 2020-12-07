export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (arr, min = 0, max = 1) => {
  const result = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    result.push(arr[getRandomInteger(0, arr.length - 1)]);
  }
  return result;
};
