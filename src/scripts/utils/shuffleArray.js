/**
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export default function shuffleArray(arr) {
  const result = Array.from(arr);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const storage = result[i];
    result[i] = result[j];
    result[j] = storage;
  }
  return result;
}
