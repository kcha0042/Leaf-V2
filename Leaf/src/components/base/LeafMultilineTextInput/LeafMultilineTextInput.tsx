import React, { useRef } from "react";
import { TextInput, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import VStack from "../../containers/VStack";
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

const LeafMultilineTextInput: React.FC<Props> = ({
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
    const labelTypography = LeafTypography.subscript;
    const labelColor =
        valid == undefined
            ? labelTypography.color
            : valid
            ? LeafColors.textSuccess.getColor()
            : LeafColors.textError.getColor();

    return (
        <TouchableWithoutFeedback
            style={[wide ? { width: "100%" } : { alignSelf: "center" }, { flexDirection: "row" }]}
            onPress={() => {
                textInputRef.current.focus();
            }}
        >
            <VStack
                spacing={2}
                style={{
                    width: wide ? "100%" : undefined,
                    alignSelf: wide ? undefined : "center",
                    backgroundColor: color.getColor(),
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                }}
            >
                <LeafText typography={labelTypography} style={{ color: labelColor }}>
                    {label}
                </LeafText>

                <TextInput
                    ref={textInputRef}
                    multiline={true}
                    style={[
                        {
                            backgroundColor: color.getColor(),
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

                <LeafText
                    typography={labelTypography}
                    style={{ color: labelColor, fontSize: labelTypography.size - 2, paddingTop: 2 }}
                >
                    {"• • •"}
                </LeafText>
            </VStack>
        </TouchableWithoutFeedback>
    );
};

export default LeafMultilineTextInput;
