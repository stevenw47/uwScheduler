// checks if num is between left and right (with optional boundary conditions)
export const isBetween = (
  num: number,
  left: number,
  right: number,
  leftClosed = true,
  rightClosed = true,
) => {
  let result = true;
  if (leftClosed) {
    result = result && left <= num;
  } else {
    result = result && left < num;
  }
  if (rightClosed) {
    result = result && num <= right;
  } else {
    result = result && num < right;
  }
  return result;
};
