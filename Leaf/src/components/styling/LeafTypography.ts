import LeafColors from "./LeafColors";
import { LeafFontFamily } from "./typography/LeafFontFamily";
import { LeafFontWeight } from "./typography/LeafFontWeight";
import LeafTypographyConfig from "./typography/LeafTypographyConfig";

class LeafTypography {
    static get display(): LeafTypographyConfig {
        return new LeafTypographyConfig(70, LeafFontFamily.gilroy, LeafColors.textBlack, LeafFontWeight.black);
    }

    static get header(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            40,
            LeafFontFamily.circular,
            LeafColors.textDark,
            LeafFontWeight.black,
            false,
            false,
            false,
            -0.5,
        );
    }

    static get cardTitle(): LeafTypographyConfig {
        return new LeafTypographyConfig(20, LeafFontFamily.poppins, LeafColors.textDark, LeafFontWeight.semiBold);
    }

    static get formCardTitle(): LeafTypographyConfig {
        return new LeafTypographyConfig(16, LeafFontFamily.poppins, LeafColors.textDark, LeafFontWeight.bold);
    }

    static get body(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.poppins, LeafColors.textDark);
    }

    static get subscript(): LeafTypographyConfig {
        return new LeafTypographyConfig(13, LeafFontFamily.poppins, LeafColors.textSemiDark);
    }

    static get badge(): LeafTypographyConfig {
        return new LeafTypographyConfig(18, LeafFontFamily.poppins, undefined, LeafFontWeight.bold);
    }

    static get primaryButton(): LeafTypographyConfig {
        return new LeafTypographyConfig(18, LeafFontFamily.poppins, LeafColors.textLight, LeafFontWeight.bold);
    }

    static get drawerItem(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.poppins, LeafColors.textDark);
    }

    static get drawerTitle(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            32,
            LeafFontFamily.circular,
            LeafColors.textDark,
            LeafFontWeight.black,
            false,
            false,
            false,
            -0.5,
        );
    }

    static get subscriptLabel(): LeafTypographyConfig {
        return new LeafTypographyConfig(10, LeafFontFamily.poppins, LeafColors.textSemiDark);
    }
}

export default LeafTypography;
