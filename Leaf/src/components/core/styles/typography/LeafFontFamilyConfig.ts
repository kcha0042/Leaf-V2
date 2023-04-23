import { LeafFont } from "./LeafFont";

class LeafFontFamilyConfig {

    public readonly regular: LeafFont
    public readonly bold: LeafFont
    public readonly italic: LeafFont
    public readonly boldItalic: LeafFont

    constructor(
        regular: LeafFont, 
        bold: LeafFont, 
        italic: LeafFont, 
        boldItalic: LeafFont
    ) {
        this.regular = regular;
        this.bold = bold;
        this.italic = italic;
        this.boldItalic = boldItalic;
    }

    public getFont(isBold: boolean, isItalic: boolean): LeafFont {
        if (!isBold && !isItalic) {
            return this.regular;
        } else if (isBold && !isItalic) {
            return this.bold;
        } else if (!isBold && isItalic) {
            return this.italic;
        } else {
            return this.boldItalic;
        }
    }

}

export default LeafFontFamilyConfig;