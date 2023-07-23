import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import LeafColor from "../../styling/color/LeafColor";
import LeafImage from "../LeafImage/LeafImage";
import { LeafImageScale } from "../LeafImage/LeafImageScale";
import LeafIcon from "../LeafIcon/LeafIcon";
import LeafColors from "../../styling/LeafColors";

interface Props {
    // The button (background) color
    color: LeafColor;
    // https://pictogrammers.com/library/mdi/
    icon?: string;
    // The icon color
    iconColor?: LeafColor;
    // File name found in assets/images
    // REMEMBER TO REGISTER IMAGE (ImageMap, found in LeafImages.ts)
    fileName?: string;
    // The size of the icon (use LeafIconSize where appropriate)
    size: number;
    // True if the background button should not be visible (only the icon)
    onlyIcon?: boolean;
    // Style props
    style?: ViewStyle;
    // Callback on press
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
                backgroundColor: onlyIcon ? LeafColors.transparent.getColor() : color.getColor(),
                borderRadius: onlyIcon ? 0 : 50,
                width: size,
                height: size,
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
