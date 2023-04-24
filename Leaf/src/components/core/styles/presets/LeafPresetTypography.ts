import { UnreachableCaseError } from "../../../../language/errors/UnreachableCaseError";
import { LeafFontFamily } from "../typography/LeafFontFamily";
import LeafTypographyConfig from "../typography/LeafTypographyConfig";
import { LeafPresetColor } from "./LeafPresetColor";

export enum LeafPresetTypography {
    body,
    primaryButton,
}

export namespace LeafPresetTypography {
    export function getConfig(typography: LeafPresetTypography): LeafTypographyConfig {
        switch (typography) {
            case LeafPresetTypography.body:
                return new LeafTypographyConfig(
                    15,
                    LeafFontFamily.poppins,
                    LeafPresetColor.bodyText,
                );
            case LeafPresetTypography.primaryButton:
                return new LeafTypographyConfig(
                    14,
                    LeafFontFamily.poppins,
                    LeafPresetColor.primaryButtonText,
                );
            default:
                throw new UnreachableCaseError(typography);
        }
    }

    export function getStyle(typography: LeafPresetTypography): {} {
        let config: LeafTypographyConfig = LeafPresetTypography.getConfig(typography);
        return config.getStylesheet();
    }
}