import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { ColorScheme } from "../../../state/environment/types/ColorScheme";
import Environment from "../../../state/environment/Environment";
import { assert } from "../../../language/assertions/Assert";

class LeafColor {
    private readonly lightMode: string;
    private readonly darkMode: string;

    constructor(lightMode: string, darkMode?: string) {
        // If no dark mode is provided, dark mode / light mode is equivalent
        const setDarkMode = darkMode || lightMode;
        this.lightMode = lightMode;
        this.darkMode = setDarkMode;
        // Validate
        assert(this.isValidColor(this.lightMode), "Invalid color provided: " + this.lightMode);
        assert(this.isValidColor(this.darkMode), "Invalid color provided: " + this.darkMode);
    }

    /**
     * Gets the color based on the user's active color scheme (light mode / dark mode)
     *
     * @returns Validated color string
     */
    public getColor(): string {
        const colorScheme: ColorScheme = Environment.instance.getColorScheme();
        switch (colorScheme) {
            case ColorScheme.Dark:
                return this.darkMode;
            case ColorScheme.Light:
                return this.lightMode;
            default:
                throw new UnreachableCaseError(colorScheme);
        }
    }

    private isValidColor(color: string): boolean {
        // Validate hex color
        // prettier-ignore
        if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            return true;
        }
        // Validate named colors, rgb, rgba, hsl, hsla colors
        // prettier-ignore
        if (/(^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$)|(^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(0?(\.\d{1,2})?|1)\)$)|(^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$)|(^hsla\((\d{1,3}),(\d{1,3})%,(\d{1,3})%,(0?(\.\d{1,2})?|1)\)$)/i.test(color)) {
            return true;
        }
        // Validate named colors (only includes basic ones)
        // prettier-ignore
        if (/^(red|blue|green|black|white|gray|cyan|yellow|magenta|aqua|fuchsia|lime|maroon|navy|olive|purple|silver|teal)$/i.test(color)) {
            return true;
        }
        // Unique cases
        if (color == "transparent") {
            return true;
        }
        return false;
    }
}

export default LeafColor;
