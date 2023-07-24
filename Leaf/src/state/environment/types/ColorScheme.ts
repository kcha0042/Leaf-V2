import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";

export enum ColorScheme {
    Dark,
    Light,
}

export namespace ColorScheme {
    export function toString(scheme: ColorScheme): string {
        switch (scheme) {
            case ColorScheme.Dark:
                return "Dark Mode";
            case ColorScheme.Light:
                return "Light Mode";
            default:
                throw new UnreachableCaseError(scheme);
        }
    }
}
