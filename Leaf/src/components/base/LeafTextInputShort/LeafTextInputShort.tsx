import React from "react";
import { TextInput, View, ViewStyle } from "react-native";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafColor from "../../styling/color/LeafColor";
import LeafText from "../LeafText/LeafText";

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafTextInputShort: React.FC<Props> = ({
    label,
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundDark,
    wide = true,
    valid = undefined,
    style,
    onTextChange,
}) => {
    const [text, setText] = React.useState("");
    const typography = LeafTypography.body.withColor(textColor);
    if (valid != undefined) {
        typography.withColor(valid ? LeafColors.textSuccess : LeafColors.textError);
    }
    const labelTypography = LeafTypography.body.withColor(LeafColors.textSemiDark);

    return (
        <View
            style={[
                wide ? { width: "100%" } : { alignSelf: "center" },
                { flexDirection: "row" },
                { backgroundColor: color.getColor(), borderRadius: 12 },
            ]}
        >
            <LeafText
                typography={labelTypography}
                style={{ position: "absolute", alignSelf: "center", paddingHorizontal: 16 }}
            >
                {text.length == 0 ? label : ""}
            </LeafText>

            <TextInput
                style={[
                    wide ? { width: "100%" } : { alignSelf: "center" },
                    {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                    },
                    typography.getStylesheet(),
                    style,
                ]}
                onChangeText={(text) => {
                    setText(text);
                    onTextChange(text);
                }}
                value={text}
            />
        </View>
    );
};

export default LeafTextInputShort;
