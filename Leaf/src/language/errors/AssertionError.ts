/**
 * To be thrown in assertion statements
 * Refer to Assert.ts and AssertionFailure.ts
 */
export class AssertionError extends Error {
    constructor(message: string) {
        super(`[ASSERTION ERROR] ${message}`);
    }
}
