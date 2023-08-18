import React, { useEffect, useRef, useState } from "react";
import { Platform, TextInput, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { strings } from "../../../localisation/Strings";
import HStack from "../../containers/HStack";
import VStack from "../../containers/VStack";
import LeafColor from "../../styling/color/LeafColor";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafText from "../LeafText/LeafText";
import StateManager from "../../../state/publishers/StateManager";

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    onChange: (date?: Date) => void; // called when date string is completed
}

/**
 * Handles input of date strings.
 * Note: onChange is only called when the date string is completed.
 * @param props {@link Props}
 * @returns
 */
const LeafTimeInput: React.FC<Props> = ({
    label,
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundDark,
    wide = true,
    valid = undefined,
    style,
    onChange,
}) => {
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [borderColor, setBorderColor] = useState(color);
    const [currentTextColor, setTextCurrentColor] = useState(textColor);

    const maskText = (text: string): string => {
        let value = text.replace(/\D/g, ""); // Remove any non-digit characters

        // Apply mask
        if (value.length <= 2) {
            return value;
        } else if (value.length <= 3) {
            return value.slice(0, 2) + ":" + value.slice(2);
        } else {
            return value.slice(0, 2) + ":" + value.slice(2, 4);
        }
    };

    const validateText = (text: string): boolean => {
        if (text.length != 5) return false;

        const [hours, minutes] = text.split(":").map(Number);

        if (hours > 24 || minutes > 59) return false;

        return true;
    };

    const createDate = (timeStr: string): Date | undefined => {
        if (validateText(timeStr)) {
            const [hours, minutes] = timeStr.split(":").map(Number);
            const currentDate = new Date();
            currentDate.setHours(hours, minutes);
            return currentDate;
        }
    };

    const onTextChange = (text: string) => {
        setError(false);
        setText(maskText(text));
        const date = createDate(text);
        onChange(date);
        if (!validateText(text) && text != "") {
            setTextCurrentColor(LeafColors.textError);
            setBorderColor(LeafColors.textError);
        } else {
            setTextCurrentColor(textColor);
            setBorderColor(color);
        }
    };

    const onFocus = () => {
        setError(false);
        setBorderColor(textColor);
    };

    const onBlur = () => {
        setError(!validateText(text) && text != "");
        setBorderColor(color);
    };

    const [isFocused, setIsFocused] = useState(false);
    const borderWidth = 2.0;
    const textInputRef = useRef<TextInput>(null);
    const typography = LeafTypography.body.withColor(currentTextColor);
    const errorTypography = LeafTypography.error;
    errorTypography.size = LeafTypography.subscriptLabel.size;
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
            setError(false);
            onChange(undefined);
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
                    borderColor: isFocused ? typography.color : borderColor.getColor(),
                    borderWidth: borderWidth,
                }}
            >
                <LeafText typography={labelTypography} style={{ color: labelColor }}>
                    {label}
                </LeafText>

                <HStack>
                    <LeafText typography={LeafTypography.subscriptLabel} wide={false}>
                        {strings("inputLabel.timeFormat")}
                    </LeafText>
                    {!error ? undefined : (
                        <LeafText typography={errorTypography} wide={false}>
                            {` - ${strings("error.invalidTime")}`}
                        </LeafText>
                    )}
                </HStack>

                <TextInput
                    ref={textInputRef}
                    style={[
                        {
                            backgroundColor: color.getColor(),
                            ...Platform.select({
                                web: { outlineStyle: "none" },
                            }),
                            color: currentTextColor.getColor(),
                        },
                        typography.getStylesheet(),
                        style,
                    ]}
                    onChangeText={(text) => {
                        setText(maskText != undefined ? maskText(text) : text);
                        onTextChange(text);
                    }}
                    value={maskText(text)}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    keyboardType={"numeric"}
                />
            </VStack>
        </TouchableWithoutFeedback>
    );
};

export default LeafTimeInput;
