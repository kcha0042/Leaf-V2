import { Dimensions, PlatformIOSStatic } from "react-native"
import { Platform } from 'react-native';
import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";

class Environment {

    public static readonly instance = new Environment()

    private constructor() { }

    public getOS(): OS {
        switch (Platform.OS) {
            case 'android':
                return OS.android;
            case 'ios':
                return OS.ios;
            case 'windows':
                return OS.windows;
            case 'macos':
                return OS.macos;
            case 'web':
                return OS.web;
            default:
                return OS.other;
        }
    }

    public getScreenType(): ScreenType {
        const os = this.getOS();
        switch (os) {
            case OS.ios:
                return (Platform as PlatformIOSStatic).isPad ? ScreenType.large : ScreenType.mobile;
            case OS.android:
                // TODO: Figure out how to detect Android tablets
                return ScreenType.mobile;
            case OS.windows:
            case OS.macos:
                return ScreenType.large;
            case OS.web:
            case OS.other:
                const dimensions = this.getScreenDimensions();
                if (dimensions[1] > dimensions[0]) {
                    // Height > width, assume mobile
                    return ScreenType.mobile;
                }
                // Any landscape screen on a web client can be assumed to be on a large screen
                return ScreenType.large;
            default:
                throw new UnreachableCaseError(os);
        }
    }

    private getScreenDimensions(): [number, number] {
        return [
            Dimensions.get("window").width,
            Dimensions.get("window").height
        ]
    }

}

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

export enum ScreenType {
    mobile,
    large
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

export default Environment;