import { AssertionError } from "../errors/AssertionError";

/**
 * Crashes the application unconditionally - for debugging at runtime
 *
 * @param message The message to output if the condition fails
 */
export function assertionFailure(message: string) {
    throw new AssertionError(message);
}
