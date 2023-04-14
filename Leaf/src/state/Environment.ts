import { Dimensions } from "react-native"
import { Platform } from 'react-native';

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
            case OS.android:
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
                const exhaustiveCheck: never = os;
                throw new Error(`Unhandled case: ${exhaustiveCheck}`);
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

export enum ScreenType {
    mobile,
    large
}

export default Environment;