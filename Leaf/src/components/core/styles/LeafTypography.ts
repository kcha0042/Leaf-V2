import { LeafFontFamily } from "./typography/LeafFontFamily";
import LeafTypographyConfig from "./typography/LeafTypographyConfig";
import LeafColors from "./LeafColors";

class LeafTypography {

    static get display(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            70,
            LeafFontFamily.gilroy,
            LeafColors.textDark,
        );
    }

    static get body(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            15,
            LeafFontFamily.poppins,
            LeafColors.textDark,
        );
    }

    static get primaryButton(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            18,
            LeafFontFamily.poppins,
            LeafColors.textLight,
            true,
        );
    }

}

export default LeafTypography;