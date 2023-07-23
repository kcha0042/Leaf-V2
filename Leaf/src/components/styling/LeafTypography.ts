import LeafColors from "./LeafColors";
import { LeafFontFamily } from "./typography/LeafFontFamily";
import { LeafFontWeight } from "./typography/LeafFontWeight";
import LeafTypographyConfig from "./typography/LeafTypographyConfig";

class LeafTypography {
    static get display(): LeafTypographyConfig {
        return new LeafTypographyConfig(70, LeafFontFamily.Gilroy, LeafColors.textBlack, LeafFontWeight.Black);
    }

    static get header(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            40,
            LeafFontFamily.Circular,
            LeafColors.textDark,
            LeafFontWeight.Black,
            false,
            false,
            false,
            -0.5,
        );
    }

    static get cardTitle(): LeafTypographyConfig {
        return new LeafTypographyConfig(20, LeafFontFamily.Poppins, LeafColors.textDark, LeafFontWeight.SemiBold);
    }

    static get formCardTitle(): LeafTypographyConfig {
        return new LeafTypographyConfig(16, LeafFontFamily.Poppins, LeafColors.textDark, LeafFontWeight.Bold);
    }

    static get body(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.Poppins, LeafColors.textDark);
    }

    static get subscript(): LeafTypographyConfig {
        return new LeafTypographyConfig(13, LeafFontFamily.Poppins, LeafColors.textSemiDark);
    }

    static get badge(): LeafTypographyConfig {
        return new LeafTypographyConfig(18, LeafFontFamily.Poppins, undefined, LeafFontWeight.Bold);
    }

    static get primaryButton(): LeafTypographyConfig {
        return new LeafTypographyConfig(18, LeafFontFamily.Poppins, LeafColors.textLight, LeafFontWeight.Bold);
    }

    static get drawerItem(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.Poppins, LeafColors.textDark);
    }

    static get drawerTitle(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            32,
            LeafFontFamily.Circular,
            LeafColors.textDark,
            LeafFontWeight.Black,
            false,
            false,
            false,
            -0.5,
        );
    }

    static get subscriptLabel(): LeafTypographyConfig {
        return new LeafTypographyConfig(10, LeafFontFamily.Poppins, LeafColors.textSemiDark);
    }
}

export default LeafTypography;
