import React from "react";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import LeafTypography from "../../styling/LeafTypography";
import { TouchableOpacity, ViewStyle } from "react-native";
import LeafText from "../LeafText/LeafText";
import HStack from "../../containers/HStack";
import LeafIcon from "../LeafIcon/LeafIcon";
import LeafColor from "../../styling/color/LeafColor";
import LeafColors from "../../styling/LeafColors";

interface ButtonProps {
    label: string;
    onPress: () => any;
    wide?: boolean;
    icon?: string;
    iconColor?: LeafColor;
    iconSize?: number;
    typography?: LeafTypographyConfig;
    style?: ViewStyle;
}

const LeafTextButton: React.FC<ButtonProps> = ({
    typography = LeafTypography.textButton,
    wide = true,
    icon,
    iconSize,
    iconColor,
    label,
    onPress,
    style,
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <HStack
                style={{
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <LeafText typography={typography} wide={wide}>
                    {" "}
                    {label}{" "}
                </LeafText>
                {icon != undefined ? (
                    <LeafIcon icon={icon} color={iconColor || LeafColors.accent} size={iconSize || 20} />
                ) : null}
            </HStack>
        </TouchableOpacity>
    );
};

export default LeafTextButton;
