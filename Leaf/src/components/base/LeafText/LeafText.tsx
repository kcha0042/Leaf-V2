import React from "react";
import { Text } from "react-native-paper";
import { TextStyle } from "react-native";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import { LeafFontFamily } from "../../styling/typography/LeafFontFamily";
import LeafTypography from "../../styling/LeafTypography";

interface Props {
    // Text or other components to be embedded
    children;
    // Typography applied
    typography?: LeafTypographyConfig;
    // If the component should expand to take up available horizontal space
    wide?: boolean;
    // If the frame should exactly match the text
    verticalWrap?: boolean;
    // Custom styling
    style?: TextStyle;
}

const LeafText: React.FC<Props> = ({
    children,
    typography = LeafTypography.body,
    verticalWrap = false,
    wide = true,
    style,
}) => {
    // For some reason the poppins font is slightly offset
    // This is a workaround
    let lineHeightMultiplier = typography.fontFamily == LeafFontFamily.poppins ? 1.15 : 1.0;
    return (
        <Text
            style={[
                wide ? { width: "100%" } : { alignSelf: "center" },
                typography.getStylesheet(),
                verticalWrap
                    ? {
                          lineHeight: typography.size * lineHeightMultiplier,
                      }
                    : null,
                style,
            ]}
        >
            {children}
        </Text>
    );
};

export default LeafText;
