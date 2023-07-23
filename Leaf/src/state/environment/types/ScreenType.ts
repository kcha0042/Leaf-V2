import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";

export enum ScreenType {
    Mobile,
    Large,
}

export namespace ScreenType {
    export function toString(screenType: ScreenType): string {
        switch (screenType) {
            case ScreenType.Mobile:
                return "Mobile";
            case ScreenType.Large:
                return "Large";
            default:
                throw new UnreachableCaseError(screenType);
        }
    }
}
