import { useState } from "react";
import { ViewStyle } from "react-native";
import { strings } from "../../localisation/Strings";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";

interface Props {
    style?: ViewStyle;
    onSelection: (code: TriageCode) => void;
}

const PatientsPicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState<LeafSegmentedValue | null>(new LeafSegmentedValue(strings("label.all"), strings("label.all")));
    const onSetSegmentedValue = (segmentedValue) => {
        setSegmentedValue(segmentedValue);
        onSelection(segmentedValue.value);
    };

    return (
        <LeafSegmentedButtons
            label={""}
            labeled={false} // Can delete this if you want and have the label as filter?
            options={[
                new LeafSegmentedValue(strings("label.allocated"), strings("label.allocated")),
                new LeafSegmentedValue(strings("label.all"), strings("label.all")),
            ]}
            value={segmentedValue}
            onSetValue={onSetSegmentedValue}
            style={style}
        />
    );
};

export default PatientsPicker;
