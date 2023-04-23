import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";

export enum ColorScheme {
    dark,
    light
}

export namespace ColorScheme {
    export function toString(scheme: ColorScheme): string {
        switch (scheme) {
            case ColorScheme.dark:
                return "Dark Mode"
            case ColorScheme.light:
                return "Light Mode"
            default: 
                throw new UnreachableCaseError(scheme);
        }
    }
}