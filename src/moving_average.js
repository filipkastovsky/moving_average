const SMA = (array, endpoint = array.lenght, period = endpoint) => {
  let sum = 0;
  for (let i = endpoint - period + 1; i <= endpoint; i++) {
    sum += array[i];
  }
  return sum / period ? sum / period : NaN;
};

const EMA = (array, period) => {
  let k = 2 / (period + 1);

  let emaArray = [array[0]];
  for (let i = 1; i < array.length; i++) {
    emaArray.push(array[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
};

export { SMA, EMA };
