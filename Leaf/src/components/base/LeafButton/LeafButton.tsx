import React from "react";
import { Button } from "react-native-paper";
import { LeafButtonType } from "./LeafButtonType";
import LeafText from "../LeafText/LeafText";
import Environment from "../../../state/environment/Environment";
import { OS } from "../../../state/environment/types/OS";
import { ViewStyle } from "react-native";
import LeafTypographyConfig from "../../styling/typography/LeafTypographyConfig";
import LeafColor from "../../styling/color/LeafColor";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";

interface Props {
    label: string;
    type?: LeafButtonType;
    typography?: LeafTypographyConfig;
    color?: LeafColor;
    icon?: string; // https://pictogrammers.com/library/mdi/
    disabled?: boolean;
    wide?: boolean;
    style?: ViewStyle;
    onPress: () => void;
}

const LeafButton: React.FC<Props> = ({
    label,
    type = LeafButtonType.Filled,
    typography = LeafTypography.button,
    color = LeafColors.accent,
    icon = null,
    disabled = false,
    wide = true,
    style,
    onPress,
}) => {
    // TODO: Figure out a better way to centre the text
    let labelStyle = {};
    if (Environment.inst.getOS() == OS.IOS) {
        labelStyle = { lineHeight: 0 }; // Centres the text
    }

    if (disabled) {
        // Override colour when disabled
        typography.leafColor = undefined;
    }

    return (
        <Button
            icon={
                icon
                    ? ({ size }) => (
                          <Icon
                              name={icon}
                              size={size + 8}
                              color={typography.color}
                              style={{
                                  paddingLeft: 6,
                              }}
                          />
                      )
                    : undefined
            }
            mode={type}
            onPress={onPress}
            disabled={disabled}
            labelStyle={[{ padding: 2 }, labelStyle]}
            style={[{ borderRadius: 50 }, wide ? { width: "100%" } : { alignSelf: "center" }, style]}
            buttonColor={color.getColor()}
        >
            <LeafText typography={typography}>{label}</LeafText>
        </Button>
    );
};

export default LeafButton;
