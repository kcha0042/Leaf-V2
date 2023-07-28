import React from "react";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import LeafTypography from "../../styling/LeafTypography";
import { TouchableOpacity, ViewStyle } from "react-native";
import LeafText from "../LeafText/LeafText";

interface ButtonProps {
    label: string;
    onPress: () => any;
    typography?: LeafTypographyConfig;
    style?: ViewStyle;
}

const LeafTextButton: React.FC<ButtonProps> = ({ typography = LeafTypography.textButton, label, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <LeafText typography={typography}> {label} </LeafText>
        </TouchableOpacity>
    );
};

export default LeafTextButton;
