import LeafColor from "./color/LeafColor";

class LeafColors {

    static get bodyText(): LeafColor {
        return new LeafColor("#212529", "#f8f9fa");
    }

    static get primaryButton(): LeafColor {
        return new LeafColor("#f8f9fa", "#212529");
    }

}

export default LeafColors;