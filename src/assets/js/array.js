export const without = (arr, index) => arr.slice(0, index).concat(arr.slice(index + 1));

export default {
  without
}
