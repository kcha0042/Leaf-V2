import { Appearance, Dimensions, PlatformIOSStatic } from "react-native"
import { Platform } from 'react-native';
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { OS } from "./types/OS";
import { ScreenType } from "./types/ScreenType";
import { ColorScheme } from "./types/ColorScheme";
import { LeafScreenOrientation } from "./types/LeafScreenOrientation";

class Environment {

    public static readonly instance = new Environment()

    private constructor() { }

    public getColorScheme(): ColorScheme {
        // TODO: I can't get this to change correctly
        const colorScheme = Appearance.getColorScheme();
        switch (colorScheme) {
            case 'dark':
                return ColorScheme.dark;
            case 'light':
                return ColorScheme.light;
            default:
                return ColorScheme.light;
        }
    }

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

    public getScreenOrientation(): LeafScreenOrientation {
        const dimensions = this.getScreenDimensions();
        if (dimensions[0] > dimensions[1]){
            return LeafScreenOrientation.Landscape;
        }
        
        return LeafScreenOrientation.Potrait;
    }

    public getScreenWidth(): number {
        return Dimensions.get('window').width;
    }

    public getScreenHeight(): number {
        return Dimensions.get('window').height;
    }

    private getScreenDimensions(): [number, number] {
        return [
            Dimensions.get("window").width,
            Dimensions.get("window").height
        ]
    }

}

export default Environment;