import React, { useRef } from "react";
import { Platform, TextInput, View, ViewStyle, TouchableWithoutFeedback } from "react-native";
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
                { flexDirection: "row", backgroundColor: color.getColor(), borderRadius: 12 },
            ]}
        >
            <TouchableWithoutFeedback
                
                onPress={() => {
                    textInputRef.current.focus();
                }}
            >
                <View style={{
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                    position: "absolute",
                    flexDirection: "row",
                    height: "100%",
                    ...Platform.select({
                        web: { cursor: "text" },
                    }),

                }}>
                    <LeafText
                        typography={labelTypography}
                        verticalWrap={true}
                        style={{
                            alignSelf: "center",
                        }}
                    >
                        {text.length == 0 ? label : ""}
                    </LeafText>
                </View>
               
            </TouchableWithoutFeedback>

            <TextInput
                ref={textInputRef}
                style={[
                    wide ? { width: "100%" } : { alignSelf: "center" },
                    {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
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

export default LeafTextInputShort;
