import { LeafFontFamily } from "./typography/LeafFontFamily";
import LeafTypographyConfig from "./typography/LeafTypographyConfig";
import LeafColors from "./LeafColors";

class LeafTypography {

    static get body(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            15,
            LeafFontFamily.poppins,
            LeafColors.bodyText,
        );
    }

    static get primaryButton(): LeafTypographyConfig {
        return new LeafTypographyConfig(
            15,
            LeafFontFamily.poppins,
            LeafColors.primaryButton,
        );
    }

}

export default LeafTypography;