import React from "react";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import LeafTypography from "../../styling/LeafTypography";
import { TouchableOpacity } from "react-native";
import LeafText from "../LeafText/LeafText";

interface ButtonProps {
    label: string;
    onPress: () => any;
    typography?: LeafTypographyConfig;
}

const TextButton: React.FC<ButtonProps> = ({
    typography = LeafTypography.textButton,
    label,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LeafText typography={typography}> { label } </LeafText>
        </TouchableOpacity>
    )
}

export default TextButton;