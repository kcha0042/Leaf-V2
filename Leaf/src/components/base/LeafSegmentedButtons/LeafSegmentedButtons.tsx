import React from "react";
import { SegmentedButtons } from "react-native-paper";
import { ViewStyle } from "react-native";
import LeafSegmentedValue from "./LeafSegmentedValue";
import LeafColors from "../../styling/LeafColors";
import LeafTypography from "../../styling/LeafTypography";
import LeafColor from "../../styling/color/LeafColor";

/*
// EXAMPLE

const [segmentedValue, setSegmentedValue] = React.useState(null);
const onSetSegmentedValue = (value) => {
    // Do something with value
    // ...
    setSegmentedValue(value);
}

// ...

<LeafSegmentedButtons 
    options={[new LeafSegmentedValue(0, "Hello"), new LeafSegmentedValue(1, "World")]}
    value={segmentedValue}
    onSetValue={onSetSegmentedValue}
/>
 */

interface Props {
    options: LeafSegmentedValue[];
    value: string | null;
    selectedLabelColor?: LeafColor;
    selectedBackgroundColor?: LeafColor;
    style?: ViewStyle;
    onSetValue: (value: string) => void;
}

const LeafSegmentedButtons: React.FC<Props> = ({
    options,
    value,
    selectedLabelColor = LeafColors.textDark,
    selectedBackgroundColor = LeafColors.lightAccent,
    style,
    onSetValue,
}) => {
    return (
        <SegmentedButtons
            value={value}
            onValueChange={onSetValue}
            buttons={options.map((option) => ({
                value: option.value,
                label: option.label,
                icon: option.icon,
                checkedColor: selectedLabelColor.getColor(),
                uncheckedColor: LeafColors.textDark.getColor(),
                style: {
                    backgroundColor: value == option.value ? selectedBackgroundColor.getColor() : null,
                    ...LeafTypography.body.getStylesheet(),
                },
            }))}
            style={{
                flex: 1,
                alignItems: "center",
                width: "100%",
                ...style,
            }}
        />
    );
};

export default LeafSegmentedButtons;
