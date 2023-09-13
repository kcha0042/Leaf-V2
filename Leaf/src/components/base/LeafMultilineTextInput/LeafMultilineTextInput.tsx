import React, { useEffect, useRef, useState } from "react";
import { Platform, TextInput, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import VStack from "../../containers/VStack";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafColor from "../../styling/color/LeafColor";
import LeafText from "../LeafText/LeafText";
import StateManager from "../../../state/publishers/StateManager";

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
    initialValue?: string;
}

const LeafMultilineTextInput: React.FC<Props> = ({
    label,
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundDark,
    wide = true,
    valid = undefined,
    style,
    onTextChange,
    initialValue,
}) => {
    const [text, setText] = React.useState(initialValue ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const textInputRef = useRef<TextInput>(null);
    const borderWidth = 2.0;
    const typography = LeafTypography.body.withColor(textColor);
    const labelTypography = LeafTypography.subscript;
    const labelColor =
        valid == undefined
            ? labelTypography.color
            : valid
            ? LeafColors.textSuccess.getColor()
            : LeafColors.textError.getColor();

    useEffect(() => {
        const unsubscribe = StateManager.clearAllInputs.subscribe(() => {
            setText("");
            onTextChange("");
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <TouchableWithoutFeedback
            style={[wide ? { width: "100%" } : { alignSelf: "center" }, { flexDirection: "row" }]}
            onPress={() => {
                if (textInputRef.current) {
                    textInputRef.current.focus();
                }
            }}
        >
            <VStack
                spacing={2}
                style={{
                    width: wide ? "100%" : undefined,
                    alignSelf: wide ? undefined : "center",
                    backgroundColor: color.getColor(),
                    paddingVertical: 12 - borderWidth,
                    paddingHorizontal: 16 - borderWidth,
                    borderRadius: 12,
                    borderColor: isFocused ? typography.color : color.getColor(),
                    borderWidth: borderWidth,
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
                            ...Platform.select({
                                web: {
                                    outlineStyle: "none",
                                    height: 64,
                                },
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
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
