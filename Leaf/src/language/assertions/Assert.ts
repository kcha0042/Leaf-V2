import { AssertionError } from "../errors/AssertionError";

/**
 * Performs an assertion for debugging at runtime
 *
 * @param condition The condition to be tested
 * @param message The message to output if the condition fails
 */
export function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new AssertionError(message);
    }
}
