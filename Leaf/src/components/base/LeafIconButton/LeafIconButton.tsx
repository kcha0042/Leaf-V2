import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import LeafColor from "../../styling/color/LeafColor";
import LeafImage from "../LeafImage/LeafImage";
import { LeafImageScale } from "../LeafImage/LeafImageScale";
import LeafIcon from "../LeafIcon/LeafIcon";

interface Props {
    color: LeafColor;
    icon?: string; // https://pictogrammers.com/library/mdi/
    iconColor?: LeafColor;
    fileName?: string;
    size: number;
    onlyIcon?: boolean;
    style?: ViewStyle;
    onPress: () => void;
}

const LeafIconButton: React.FC<Props> = ({
    color,
    icon = null,
    iconColor = null,
    fileName = null,
    size,
    onlyIcon = false,
    style,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={onPress == null}
            style={{
                backgroundColor: color.getColor(),
                borderRadius: 50,
                width: onlyIcon ? 0 : size,
                height: onlyIcon ? 0 : size,
                justifyContent: "center",
                ...style,
            }}
        >
            {icon == null ? (
                <LeafImage
                    fileName={fileName}
                    width={(size * 1.8) / 3.0}
                    height={(size * 1.8) / 3.0}
                    scale={LeafImageScale.scaleToFit}
                    style={{
                        alignSelf: "center",
                        tintColor: iconColor?.getColor(),
                    }}
                />
            ) : (
                <LeafIcon
                    icon={icon}
                    size={(size * 2.2) / 3.0}
                    color={iconColor ?? new LeafColor("#ffffff")}
                    style={{
                        alignSelf: "center",
                    }}
                />
            )}
        </TouchableOpacity>
    );
};

export default LeafIconButton;
