import { assert } from "../../../language/assertions/Assert";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { ColorScheme } from "../../../state/environment/types/ColorScheme";
import Environment from "../../../state/environment/Environment";

class LeafColor {
    private readonly lightMode: string;
    private readonly darkMode: string;

    constructor(lightMode: string, darkMode?: string) {
        const cssColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\([^\)]+\)$|^hsla?\([^\)]+\)$|^[\w]+$/;
        // If no dark mode is provided, dark mode / light mode is equivalent
        let setDarkMode = darkMode || lightMode;
        assert(cssColorRegex.test(lightMode), `Invalid lightMode color string provided: '${lightMode}'`);
        assert(cssColorRegex.test(setDarkMode), `Invalid darkMode color string provided: '${setDarkMode}'`);
        this.lightMode = lightMode;
        this.darkMode = setDarkMode;
    }

    /**
     * Gets the color based on the user's active color scheme (light mode / dark mode)
     *
     * @returns Validated color string
     */
    public getColor(): string {
        let colorScheme: ColorScheme = Environment.instance.getColorScheme();
        switch (colorScheme) {
            case ColorScheme.dark:
                return this.darkMode;
            case ColorScheme.light:
                return this.lightMode;
            default:
                throw new UnreachableCaseError(colorScheme);
        }
    }
}

export default LeafColor;
