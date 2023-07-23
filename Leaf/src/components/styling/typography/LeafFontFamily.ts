import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { LeafFont } from "./LeafFont";
import LeafFontFamilyConfig from "./LeafFontFamilyConfig";

export enum LeafFontFamily {
    Gilroy,
    Poppins,
    Circular,
}

export namespace LeafFontFamily {
    export function getConfig(family: LeafFontFamily): LeafFontFamilyConfig {
        switch (family) {
            case LeafFontFamily.Gilroy:
                return new LeafFontFamilyConfig(null, null, null, LeafFont.GilroyExtraBold, null, null, null, null);
            case LeafFontFamily.Poppins:
                return new LeafFontFamilyConfig(
                    LeafFont.PoppinsMedium,
                    LeafFont.PoppinsSemiBold,
                    LeafFont.PoppinsBold,
                    null,
                    LeafFont.PoppinsMediumItalic,
                    LeafFont.PoppinsSemiBoldItalic,
                    LeafFont.PoppinsBoldItalic,
                    null,
                );
            case LeafFontFamily.Circular:
                return new LeafFontFamilyConfig(
                    LeafFont.CircularMedium,
                    null,
                    LeafFont.CircularBold,
                    LeafFont.CircularBlack,
                    LeafFont.CircularMediumItalic,
                    null,
                    LeafFont.CircularBoldItalic,
                    LeafFont.CircularBlackItalic,
                );
            default:
                throw new UnreachableCaseError(family);
        }
    }
}
