import LeafColor from "./color/LeafColor";

class LeafColors {

    // Text

    static get bodyText(): LeafColor {
        return new LeafColor("#212529", "#f8f9fa");
    }

    // Buttons

    static get primaryButtonText(): LeafColor {
        return new LeafColor("#f8f9fa", "#212529");
    }

    static get primaryButton(): LeafColor {
        return new LeafColor("#51b962");
    }

    // Backgrounds

    static get containerBackground(): LeafColor {
        return new LeafColor("#e8f9e9");
    }

}

export default LeafColors;