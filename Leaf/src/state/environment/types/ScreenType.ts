import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";

export enum ScreenType {
    mobile,
    large,
}

export namespace ScreenType {
    export function toString(screenType: ScreenType): string {
        switch (screenType) {
            case ScreenType.mobile:
                return "Mobile";
            case ScreenType.large:
                return "Large";
            default:
                throw new UnreachableCaseError(screenType);
        }
    }
}
