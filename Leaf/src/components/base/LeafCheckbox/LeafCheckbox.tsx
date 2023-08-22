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
    onValueChange?: (isTicked: boolean) => void;
}

const LeafCheckbox: React.FC<Props> = ({
    color = LeafColors.textDark,
    checkColor = LeafColors.textLight,
    initialValue = false,
    size = 16,
    style,
    onValueChange,
}) => {
    const [checked, setChecked] = useState(initialValue);

    const handleChange = () => {
        if (onValueChange) {
            onValueChange(!checked);
        }
        setChecked(!checked);
    };

    return (
        <TouchableOpacity
            style={{
                backgroundColor: checked ? color.getColor() : "transparent",
                borderRadius: size / 2.5,
                borderWidth: size / 8,
                aspectRatio: 1,
                borderColor: color.getColor(),
                ...style,
            }}
            onPress={handleChange}
        >
            <LeafIcon icon={checked ? "check-bold" : "close-thick"} color={checked ? checkColor : color} size={size} />
        </TouchableOpacity>
    );
};

export default LeafCheckbox;
