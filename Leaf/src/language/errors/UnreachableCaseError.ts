
/**
 * Throw this error in the case where an area of code shouldn't be capable of being reached.
 * For instance, in the default block of a switch statement that should be exhaustively checking an enum.
 * 
 * ```
 * switch (primaryColor) {
 *     case PrimaryColor.red:
 *         console.log("RED!");
 *         break;
 *     case PrimaryColor.blue:
 *         console.log("BLUE!");
 *         break;
 *     case PrimaryColor.yellow:
 *         console.log("YELLOW!");
 *         break;
 *     case default:
 *         throw new UnreachableCaseError(primaryColor);
 * }
 * ```
 */
export class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${JSON.stringify(val)}`);
    }
}