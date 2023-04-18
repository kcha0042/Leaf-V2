import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";

export enum OS {
    ios,
    android,
    web,
    windows,
    macos,
    other
}

export namespace OS {
    export function toString(os: OS): string {
        switch (os) {
            case OS.ios: 
                return "iOS";
            case OS.android: 
                return "Android";
            case OS.windows: 
                return "Windows";
            case OS.macos: 
                return "macOS";
            case OS.web: 
                return "Web";
            case OS.other: 
                return "Unknown";
            default: 
                throw new UnreachableCaseError(os);
        }
    }
}