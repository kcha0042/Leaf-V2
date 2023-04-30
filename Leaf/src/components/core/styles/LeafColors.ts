import LeafColor from "./color/LeafColor";

/**
 * Predefined colors to be used application-wide.
 * Colors are defined with a light-mode and an optional dark-mode variant.
 * Colors should be named using light-mode convention, that is, colors should be named according to how they should be read in light mode. "Dark text" is text that is dark in light mode, and light in dark mode.
 * To select colors, I recommend the resource: https://yeun.github.io/open-color/
 */
class LeafColors {

    // Palette

    static get accent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#51b962");
    }

    static get lightAccent(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#e8f9e9");
    }

    // Text

    static get textDark(): LeafColor {
        return new LeafColor("#212529", "#f8f9fa");
    }

    static get textLight(): LeafColor {
        return new LeafColor("#f8f9fa", "#212529");
    }

    static get textError(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#e03131");
    }

    // Backgrounds

    static get textBackgroundDark(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#ececec");
    }

    static get textBackgroundLight(): LeafColor {
        // TODO: Update for dark mode
        return new LeafColor("#fefbfe");
    }

}

export default LeafColors;