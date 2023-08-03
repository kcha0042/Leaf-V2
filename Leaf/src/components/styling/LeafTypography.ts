import LeafColors from "./LeafColors";
import { LeafFontFamily } from "./typography/LeafFontFamily";
import { LeafFontWeight } from "./typography/LeafFontWeight";
import LeafTypographyConfig from "./typography/LeafTypographyConfig";

/**
 * Stores typography to be used in components application-wide.
 *
 * Don't create the same typography unnecessairly.
 * For instance, if you've got a button but it has a light background, don't create `LeafTypography.buttonLightBackground`.
 * Instead, use `LeafTypography.button`, but call `LeafTypography.button.withColor(LeafColors.textDark)`.
 * Same for stuff like body text with italics - `LeafTypography.body.withItalic(true)`.
 */
class LeafTypography {
    // Headers

    static get display(): LeafTypographyConfig {
        return new LeafTypographyConfig(70, LeafFontFamily.Gilroy, LeafColors.textBlack, LeafFontWeight.Black);
    }

    static get headerScreen(): LeafTypographyConfig {
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

    static get headerSection(): LeafTypographyConfig {
        return LeafTypography.headerScreen.withSize(24);
    }

    // Titles

    static get title1(): LeafTypographyConfig {
        return new LeafTypographyConfig(28, LeafFontFamily.Poppins, LeafColors.textDark, LeafFontWeight.Bold);
    }

    static get title2(): LeafTypographyConfig {
        return new LeafTypographyConfig(24, LeafFontFamily.Poppins, LeafColors.textDark, LeafFontWeight.SemiBold);
    }

    static get title3(): LeafTypographyConfig {
        return new LeafTypographyConfig(20, LeafFontFamily.Poppins, LeafColors.textDark, LeafFontWeight.SemiBold);
    }

    static get title4(): LeafTypographyConfig {
        return new LeafTypographyConfig(16, LeafFontFamily.Poppins, LeafColors.textDark, LeafFontWeight.SemiBold);
    }

    // Body

    static get body(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.Poppins, LeafColors.textDark);
    }

    // Subscript

    static get subscript(): LeafTypographyConfig {
        return new LeafTypographyConfig(13, LeafFontFamily.Poppins, LeafColors.textSemiDark);
    }

    static get subscriptLabel(): LeafTypographyConfig {
        return new LeafTypographyConfig(10, LeafFontFamily.Poppins, LeafColors.textSemiDark);
    }

    // Button

    static get button(): LeafTypographyConfig {
        return new LeafTypographyConfig(18, LeafFontFamily.Poppins, LeafColors.textLight, LeafFontWeight.Bold);
    }

    static get buttonSmall(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.Poppins, LeafColors.textDark);
    }

    // Drawer

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

    static get drawerItem(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.Poppins, LeafColors.textDark);
    }

    // Other

    static get badge(): LeafTypographyConfig {
        return new LeafTypographyConfig(18, LeafFontFamily.Poppins, undefined, LeafFontWeight.Bold);
    }

    static get error(): LeafTypographyConfig {
        return new LeafTypographyConfig(15, LeafFontFamily.Poppins, LeafColors.textError, LeafFontWeight.Regular, true);
    }
}

export default LeafTypography;
