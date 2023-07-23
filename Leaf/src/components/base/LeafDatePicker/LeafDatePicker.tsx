import React from "react";
import { LayoutChangeEvent, ViewStyle } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import LeafTypography from "../../styling/LeafTypography";
import LeafColors from "../../styling/LeafColors";
import LeafColor from "../../styling/color/LeafColor";
import LeafText from "../LeafText/LeafText";
import VStack from "../../containers/VStack";
import { enGB, registerTranslation } from "react-native-paper-dates";

// TODO: Modularise
registerTranslation("en-GB", enGB);

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    style?: ViewStyle;
    onDateReceived: (date: Date) => void;
}

const LeafDatePicker: React.FC<Props> = ({
    label,
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundDark,
    style,
    onDateReceived,
}) => {
    const [inputDate, setInputDate] = React.useState<Date>(undefined);
    const [textIsValid, setTextIsValid] = React.useState(false);

    const onReceiveInputDate = (newInputDate: Date) => {
        setInputDate(newInputDate);
        setTextIsValid(true);
        setLabelColor(LeafColors.textSuccess);
        onDateReceived(newInputDate);
    };

    // Label typography
    const labelTypography = LeafTypography.body;
    const [labelColor, setLabelColor] = React.useState(LeafColors.textInputDescription);

    const onFocus = () => {
        setLabelColor(textColor);
    };

    const onUnfocus = () => {
        if (!textIsValid) {
            setInputDate(undefined);
        }
        if (inputDate == undefined || !textIsValid) {
            setLabelColor(LeafColors.textError);
        }
    };

    const [width, setWidth] = React.useState(undefined);

    const onLayout = (event: LayoutChangeEvent) => {
        const layout = event.nativeEvent.layout;
        if (layout.width > 0) {
            // Only if this component is visible
            setWidth(layout.width);
        }
    };

    return (
        <VStack
            style={{
                width: "100%",
            }}
            onLayout={onLayout}
        >
            <LeafText typography={labelTypography} style={{ color: labelColor.getColor() }}>
                {label}
            </LeafText>
            <DatePickerInput
                inputMode="start"
                mode="flat"
                locale="en-GB"
                onChange={onReceiveInputDate}
                onChangeText={(text) => {
                    const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                    const isValid = dateRegex.test(text);
                    setTextIsValid(isValid);
                }}
                value={inputDate}
                style={[{ backgroundColor: color.getColor() }, { width: width ?? "100%" }, style]}
                theme={{ colors: { primary: textColor.getColor() } }}
                outlineStyle={{ borderRadius: 12 }}
                onFocus={onFocus}
                onBlur={onUnfocus}
            />
        </VStack>
    );
};

export default LeafDatePicker;
