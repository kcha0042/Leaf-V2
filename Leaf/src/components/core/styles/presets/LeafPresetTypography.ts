import { UnreachableCaseError } from "../../../../language/errors/UnreachableCaseError";
import { LeafFontFamily } from "../typography/LeafFontFamily";
import LeafTypographyConfig from "../typography/LeafTypographyConfig";
import { LeafPresetColor } from "./LeafPresetColor";

export enum LeafPresetTypography {
    body,
    primaryButton,
}

export namespace LeafPresetTypography {
    export function getStyle(typography: LeafPresetTypography): {} {
        let config: LeafTypographyConfig;
        switch (typography) {
            case LeafPresetTypography.body:
                config = new LeafTypographyConfig(
                    14,
                    LeafFontFamily.poppins,
                    LeafPresetColor.bodyText,
                );
                break;
            case LeafPresetTypography.primaryButton:
                config = new LeafTypographyConfig(
                    14,
                    LeafFontFamily.poppins,
                    LeafPresetColor.primaryButtonText,
                    true,
                );
                break;
            default:
                throw new UnreachableCaseError(typography);
        }
        return config.getStylesheet();
    }
}