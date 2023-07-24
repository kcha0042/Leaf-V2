import { Appearance, Dimensions, PlatformIOSStatic } from "react-native";
import { Platform } from "react-native";
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { OS } from "./types/OS";
import { ScreenType } from "./types/ScreenType";
import { ColorScheme } from "./types/ColorScheme";
import { LeafScreenOrientation } from "./types/LeafScreenOrientation";

class Environment {
    public static readonly inst = new Environment();

    private constructor() {}

    public getColorScheme(): ColorScheme {
        // TODO: I can't get this to change correctly
        const colorScheme = Appearance.getColorScheme();
        switch (colorScheme) {
            case "dark":
                return ColorScheme.Dark;
            case "light":
                return ColorScheme.Light;
            default:
                return ColorScheme.Light;
        }
    }

    public getOS(): OS {
        switch (Platform.OS) {
            case "android":
                return OS.Android;
            case "ios":
                return OS.IOS;
            case "windows":
                return OS.Windows;
            case "macos":
                return OS.MacOS;
            case "web":
                return OS.Web;
            default:
                return OS.Other;
        }
    }

    public getScreenType(): ScreenType {
        const os = this.getOS();
        switch (os) {
            case OS.IOS:
                return (Platform as PlatformIOSStatic).isPad ? ScreenType.Large : ScreenType.Mobile;
            case OS.Android:
                // TODO: Figure out how to detect Android tablets
                return ScreenType.Mobile;
            case OS.Windows:
            case OS.MacOS:
                return ScreenType.Large;
            case OS.Web:
            case OS.Other:
                return this.getScreenWidth() <= 925 ? ScreenType.Mobile : ScreenType.Large;
            default:
                throw new UnreachableCaseError(os);
        }
    }

    public getScreenOrientation(): LeafScreenOrientation {
        const dimensions = this.getScreenDimensions();
        if (dimensions[0] > dimensions[1]) {
            return LeafScreenOrientation.Landscape;
        }

        return LeafScreenOrientation.Potrait;
    }

    public getScreenWidth(): number {
        return Dimensions.get("window").width;
    }

    public getScreenHeight(): number {
        return Dimensions.get("window").height;
    }

    private getScreenDimensions(): [number, number] {
        return [Dimensions.get("window").width, Dimensions.get("window").height];
    }
}

export default Environment;
