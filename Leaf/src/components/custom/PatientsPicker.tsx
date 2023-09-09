import { useState } from "react";
import { ViewStyle } from "react-native";
import { strings } from "../../localisation/Strings";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";

interface Props {
    style?: ViewStyle;
    onSelection: (showAll: boolean) => void;
}

const PatientsPicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState<LeafSegmentedValue | undefined>(
        new LeafSegmentedValue(false, strings("label.allocated")),
    );
    const onSetSegmentedValue = (segmentedValue: LeafSegmentedValue | undefined) => {
        setSegmentedValue(segmentedValue);
        onSelection(segmentedValue?.value ?? false);
    };

    return (
        <LeafSegmentedButtons
            label={""}
            labeled={false} // Can delete this if you want and have the label as filter?
            clearSelectionAllowed={false}
            options={[
                new LeafSegmentedValue(false, strings("label.allocated")),
                new LeafSegmentedValue(true, strings("label.all")),
            ]}
            value={segmentedValue}
            onSetValue={onSetSegmentedValue}
            style={style}
        />
    );
};

export default PatientsPicker;
