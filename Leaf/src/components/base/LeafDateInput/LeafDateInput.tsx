import React, { useState } from "react";
import { ViewStyle } from "react-native";
import { strings } from "../../../localisation/Strings";
import VStack from "../../containers/VStack";
import LeafColor from "../../styling/color/LeafColor";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafText from "../LeafText/LeafText";
import LeafTextInput from "../LeafTextInput/LeafTextInput";

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    valid?: boolean;
    style?: ViewStyle;
    onChange: (date: Date) => void;
}

const LeafDateInput: React.FC<Props> = ({
    label,
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundDark,
    wide = true,
    valid = undefined,
    style,
    onChange
}) => {

    const [text, setText] = useState("");

    const maskText = (text: string): string => {
        // Remove all non-digit characters
        let value = text.replace(/[^\d]/g, '');

        // Insert slashes
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '/' + value.substring(5);
        }

        // Trim the value to a maximum length of 10 (to match MM/DD/YYYY format)
        return value.substring(0, 10);
    }

    const validateText = (text: string): boolean => {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
    
        // Check if date matches the format MM/DD/YYYY
        if (!regex.test(text)) return false;

        const parts = text.split('/');
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1900 || year > 2099 || month < 1 || month > 12) return false;

        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29;
        }

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    const onTextChange = (text: string) => {
        setText(text);
    }

    return (
        <VStack>
            {/* Padding is so that the text lines up with the text input after the rouned corner */}
            <LeafText typography={LeafTypography.subscriptLabel} style={{ paddingLeft: 5 }}>{strings("inputLabel.dateFormat")}</LeafText>
            <LeafTextInput
                label={label}
                onTextChange={onTextChange}
                maskText={maskText}
                textColor={textColor}
                color={color}
                wide={wide}
                valid={valid}
                style={style}
            />
        </VStack>
    )
};

export default LeafDateInput;
