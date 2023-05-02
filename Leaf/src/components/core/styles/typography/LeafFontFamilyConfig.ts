import { UnreachableCaseError } from "../../../../language/errors/UnreachableCaseError";
import { LeafFont } from "./LeafFont";
import { LeafFontWeight } from "./LeafFontWeight";

class LeafFontFamilyConfig {

    public readonly regular: LeafFont;
    public readonly semiBold: LeafFont;
    public readonly bold: LeafFont;
    public readonly italic: LeafFont;
    public readonly semiBoldItalic: LeafFont;
    public readonly boldItalic: LeafFont;

    constructor(
        regular: LeafFont, 
        semiBold: LeafFont,
        bold: LeafFont, 
        italic: LeafFont,
        semiBoldItalic: LeafFont,
        boldItalic: LeafFont,
    ) {
        this.regular = regular;
        this.semiBold = semiBold;
        this.bold = bold;
        this.italic = italic;
        this.semiBoldItalic = semiBoldItalic;
        this.boldItalic = boldItalic;
    }

    public getFont(weight: LeafFontWeight, isItalic: boolean): LeafFont {
        switch (weight) {
            case LeafFontWeight.regular:
                return isItalic ? this.italic : this.regular;
            case LeafFontWeight.semiBold:
                return isItalic ? this.semiBoldItalic : this.semiBold;
            case LeafFontWeight.bold:
                return isItalic ? this.boldItalic : this.bold;
            default:
                throw new UnreachableCaseError(weight);
        }
    }

}

export default LeafFontFamilyConfig;