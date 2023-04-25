import LeafColor from "./color/LeafColor";

/**
 * Predefined colors to be used application-wide.
 * Colors are all defined with a light-mode and dark-mode variant.
 * Colors should be named using light-mode convention, that is, colors should be named according to how they should be read in light mode. "Dark text" is text that is dark in light mode, and light in dark mode.
 */
class LeafColors {

    // Palette

    static get accent(): LeafColor {
        return new LeafColor("#51b962");
    }

    static get lightAccent(): LeafColor {
        return new LeafColor("#e8f9e9");
    }

    // Text

    static get textDark(): LeafColor {
        return new LeafColor("#212529", "#f8f9fa");
    }

    static get textLight(): LeafColor {
        return new LeafColor("#f8f9fa", "#212529");
    }

    // Backgrounds

    static get textBackgroundDark(): LeafColor {
        return new LeafColor("#ececec");
    }

    static get textBackgroundLight(): LeafColor {
        return new LeafColor("#fefbfe");
    }

}

export default LeafColors;