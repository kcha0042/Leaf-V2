/**
 * Transforms elements of the provided array using the given transform function.
 * It then filters out any null results.
 *
 * @param array - The input array of elements.
 * @param transform - The function used to transform each element.
 * @returns A new array of transformed elements without null values.
 *
 * @example
 * const numbers = [1, 2, 3, null];
 * const results = compactMap(numbers, num => (num));
 * console.log(results); // [1, 2, 3]
 */
export function compactMap<T, U>(array: T[], transform: (value: T) => U | null): U[] {
    return array.map(transform).filter((value): value is U => value !== null);
}
