import { UnreachableCaseError } from "../../../../language/errors/UnreachableCaseError";
import { LeafFont } from "./LeafFont";
import LeafFontFamilyConfig from "./LeafFontFamilyConfig";

export enum LeafFontFamily {
    gilroy,
    poppins,
}

export namespace LeafFontFamily {
    export function getConfig(family: LeafFontFamily): LeafFontFamilyConfig {
        switch (family) {
            case LeafFontFamily.gilroy: 
                return new LeafFontFamilyConfig(
                    LeafFont.gilroyExtraBold,
                    LeafFont.gilroyExtraBold,
                    LeafFont.gilroyExtraBold,
                    LeafFont.gilroyExtraBold
                );
            case LeafFontFamily.poppins:
                return new LeafFontFamilyConfig(
                    LeafFont.poppinsMedium, 
                    LeafFont.poppinsBold, 
                    LeafFont.poppinsMediumItalic, 
                    LeafFont.poppinsBoldItalic
                );
            default: 
                throw new UnreachableCaseError(family);
        }
    }
}