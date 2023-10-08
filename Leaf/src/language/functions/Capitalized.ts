/**
 * Capitalizes the first letter of every word in a given string.
 *
 * @param str - The input string to be processed.
 * @returns A new string with the first letter of each word capitalized.
 *
 * @example
 * const sentence = "hello world!";
 * const capitalizedSentence = capitalized(sentence);
 * console.log(capitalizedSentence); // Outputs: "Hello World!"
 */
export function capitalized(str: string): string {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
