import React, { useRef, useState } from "react";
import { Platform, TextInput, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { strings } from "../../../localisation/Strings";
import HStack from "../../containers/HStack";
import VStack from "../../containers/VStack";
import LeafColor from "../../styling/color/LeafColor";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafText from "../LeafText/LeafText";

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    onChange: (date: Date) => void; // called when date string is completed
}

/**
 * Handles input of date strings.
 * Note: onChange is only called when the date string is completed.
 * @param props {@link Props}
 * @returns
 */
const LeafDateInput: React.FC<Props> = ({
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

    const maskText = (text: string): string => {
        let value = text.replace(/\D/g, ""); // Remove any non-digit characters

        // Apply mask
        if (value.length <= 2) {
            return value;
        } else if (value.length <= 4) {
            return value.slice(0, 2) + "/" + value.slice(2);
        } else {
            return value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
        }
    };

    const validateText = (text: string): boolean => {
        if (text.length < 10) return false; // If not a full date string

        let [day, month, year] = text.split("/").map((i) => parseInt(i, 10));

        if (month > 12) return false;

        let daysInMonth;
        switch (month) {
            case 2: // February
                daysInMonth = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28; // Leap year check
                break;
            case 4:
            case 6:
            case 9:
            case 11: // April, June, September, November
                daysInMonth = 30;
                break;
            default:
                daysInMonth = 31;
        }

        return day <= daysInMonth;
    };

    const onTextChange = (text: string) => {
        setText(maskText(text));
        if (validateText(text)) {
            onChange(toDate(text));
        }
    };

    const onFocus = () => {
        setError(false);
        if (!validateText(text)) {
            setText("");
        }
    };

    const onBlur = () => {
        if (!validateText(text) && text != "") {
            setError(true);
        }
    };

    const toDate = (dateString: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day); // month is 0-indexed in JavaScript
    };

    const [isFocused, setIsFocused] = useState(false);
    const borderWidth = 2.0;
    const textInputRef = useRef(null);
    const typography = LeafTypography.body.withColor(textColor);
    const errorTypography = LeafTypography.error;
    errorTypography.size = LeafTypography.subscriptLabel.size;
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

                <HStack>
                    <LeafText typography={LeafTypography.subscriptLabel} wide={false}>
                        {strings("inputLabel.dateFormat")}
                    </LeafText>
                    {!error ? undefined : (
                        <LeafText typography={errorTypography} wide={false}>
                            {` - ${strings("error.invalidDate")}`}
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
                        },
                        typography.getStylesheet(),
                        style,
                    ]}
                    onChangeText={(text) => {
                        setText(maskText != undefined ? maskText(text) : text);
                        onTextChange(text);
                    }}
                    value={text}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                />
            </VStack>
        </TouchableWithoutFeedback>
    );
};

export default LeafDateInput;
