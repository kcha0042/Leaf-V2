import React, { useRef } from "react";
import { Platform, TextInput, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafColor from "../../styling/color/LeafColor";
import LeafText from "../LeafText/LeafText";
import LeafIcon from "../LeafIcon/LeafIcon";

interface Props {
    label?: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafSearchBarNew: React.FC<Props> = ({
    label = "Search",
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundAccent,
    wide = true,
    valid = undefined,
    style,
    onTextChange,
}) => {
    const [text, setText] = React.useState("");
    const textInputRef = useRef(null);
    const typography = LeafTypography.body.withColor(textColor);
    if (valid != undefined) {
        typography.withColor(valid ? LeafColors.textSuccess : LeafColors.textError);
    }
    const labelTypography = LeafTypography.body.withColor(LeafColors.textSemiDark);

    return (
        <View
            style={[
                wide ? { width: "100%" } : { alignSelf: "center" },
                {
                    flexDirection: "row",
                    backgroundColor: color.getColor(),
                    borderRadius: 30,
                    borderColor: LeafColors.outlineTextBackgroundAccent.getColor(),
                    height: 55,
                    borderWidth: 1,
                },
            ]}
        >
            <LeafIcon
                icon="magnify"
                size={26}
                color={LeafColors.textDark}
                style={{ alignSelf: "center", display: "flex", marginLeft: 16 }}
            />

            <TouchableWithoutFeedback
                style={{
                    position: "absolute",
                    flexDirection: "row",
                    height: "100%",
                    paddingHorizontal: 6,
                    ...Platform.select({
                        web: { cursor: "text" },
                    }),
                }}
                onPress={() => {
                    textInputRef.current.focus();
                }}
            >
                <LeafText
                    typography={labelTypography}
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {text.length == 0 ? label : ""}
                </LeafText>
            </TouchableWithoutFeedback>

            <TextInput
                ref={textInputRef}
                style={[
                    wide ? { width: "100%" } : { alignSelf: "center" },
                    {
                        paddingVertical: 12,
                        paddingHorizontal: 6,
                        ...Platform.select({
                            web: { outlineStyle: "none" },
                        }),
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

export default LeafSearchBarNew;
