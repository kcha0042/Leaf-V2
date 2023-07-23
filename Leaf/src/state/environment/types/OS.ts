import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";

export enum OS {
    IOS,
    Android,
    Web,
    Windows,
    MacOS,
    Other,
}

export namespace OS {
    export function toString(os: OS): string {
        switch (os) {
            case OS.IOS:
                return "iOS";
            case OS.Android:
                return "Android";
            case OS.Windows:
                return "Windows";
            case OS.MacOS:
                return "macOS";
            case OS.Web:
                return "Web";
            case OS.Other:
                return "Unknown";
            default:
                throw new UnreachableCaseError(os);
        }
    }
}
