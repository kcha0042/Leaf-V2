import React, { useState } from "react";
import { ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeafColors from "../../styling/LeafColors";
import LeafColor from "../../styling/color/LeafColor";
import LeafIcon from "../LeafIcon/LeafIcon";

interface Props {
    color?: LeafColor;
    checkColor?: LeafColor;
    initialValue?: boolean;
    size?: number;
    style?: ViewStyle;
    isChecked: boolean;
    onPress?: () => void;
}

/**
 * This is the same as LeafCheckbox but it doesn't automatically change on tap.
 * It takes an isChecked prop to update its displayed state.
 */
const LeafCheckboxStatic: React.FC<Props> = ({
    color = LeafColors.textDark,
    checkColor = LeafColors.textLight,
    size = 16,
    style,
    isChecked,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: isChecked ? color.getColor() : "transparent",
                borderRadius: size / 2.5,
                borderWidth: size / 8,
                aspectRatio: 1,
                borderColor: color.getColor(),
                justifyContent: "center",
                ...style,
            }}
            onPress={onPress}
        >
            <LeafIcon
                icon={isChecked ? "check-bold" : "close-thick"}
                color={isChecked ? checkColor : color}
                size={size}
            />
        </TouchableOpacity>
    );
};

export default LeafCheckboxStatic;
