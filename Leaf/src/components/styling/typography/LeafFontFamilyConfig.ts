import { assert } from "../../../language/assertions/Assert";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { LeafFont } from "./LeafFont";
import { LeafFontWeight } from "./LeafFontWeight";

class LeafFontFamilyConfig {
    private readonly regular: LeafFont | null;
    private readonly semiBold: LeafFont | null;
    private readonly bold: LeafFont | null;
    private readonly black: LeafFont | null;
    private readonly italic: LeafFont | null;
    private readonly semiBoldItalic: LeafFont | null;
    private readonly boldItalic: LeafFont | null;
    private readonly blackItalic: LeafFont | null;

    constructor(
        regular: LeafFont | null,
        semiBold: LeafFont | null,
        bold: LeafFont | null,
        black: LeafFont | null,
        italic: LeafFont | null,
        semiBoldItalic: LeafFont | null,
        boldItalic: LeafFont | null,
        blackItalic: LeafFont | null,
    ) {
        this.regular = regular;
        this.semiBold = semiBold;
        this.bold = bold;
        this.black = black;
        this.italic = italic;
        this.semiBoldItalic = semiBoldItalic;
        this.boldItalic = boldItalic;
        this.blackItalic = blackItalic;
    }

    public getFont(weight: LeafFontWeight, isItalic: boolean): LeafFont {
        switch (weight) {
            case LeafFontWeight.Regular:
                const regular = isItalic ? this.italic : this.regular;
                assert(regular != null, "Font requested not provided/available");
                return regular!;
            case LeafFontWeight.SemiBold:
                const semiBold = isItalic ? this.semiBoldItalic : this.semiBold;
                assert(semiBold != null, "Font requested not provided/available");
                return semiBold!;
            case LeafFontWeight.Bold:
                const bold = isItalic ? this.boldItalic : this.bold;
                assert(bold != null, "Font requested not provided/available");
                return bold!;
            case LeafFontWeight.Black:
                const black = isItalic ? this.blackItalic : this.black;
                assert(black != null, "Font requested not provided/available");
                return black!;
            default:
                throw new UnreachableCaseError(weight);
        }
    }
}

export default LeafFontFamilyConfig;
