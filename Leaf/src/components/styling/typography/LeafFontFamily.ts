import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { LeafFont } from "./LeafFont";
import LeafFontFamilyConfig from "./LeafFontFamilyConfig";

export enum LeafFontFamily {
    gilroy,
    poppins,
    circular,
}

export namespace LeafFontFamily {
    export function getConfig(family: LeafFontFamily): LeafFontFamilyConfig {
        switch (family) {
            case LeafFontFamily.gilroy:
                return new LeafFontFamilyConfig(null, null, null, LeafFont.gilroyExtraBold, null, null, null, null);
            case LeafFontFamily.poppins:
                return new LeafFontFamilyConfig(
                    LeafFont.poppinsMedium,
                    LeafFont.poppinsSemiBold,
                    LeafFont.poppinsBold,
                    null,
                    LeafFont.poppinsMediumItalic,
                    LeafFont.poppinsSemiBoldItalic,
                    LeafFont.poppinsBoldItalic,
                    null,
                );
            case LeafFontFamily.circular:
                return new LeafFontFamilyConfig(
                    LeafFont.circularMedium,
                    null,
                    LeafFont.circularBold,
                    LeafFont.circularBlack,
                    LeafFont.circularMediumItalic,
                    null,
                    LeafFont.circularBoldItalic,
                    LeafFont.circularBlackItalic,
                );
            default:
                throw new UnreachableCaseError(family);
        }
    }
}
