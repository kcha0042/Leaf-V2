import { useState } from "react";
import { ViewStyle } from "react-native";
import { strings } from "../../localisation/Strings";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import LeafColors from "../styling/LeafColors";

interface Props {
    style?: ViewStyle;
    onSelection: (code: TriageCode) => void;
}

const TriageCodePicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState<LeafSegmentedValue | null>(null);
    const onSetSegmentedValue = (segmentedValue) => {
        setSegmentedValue(segmentedValue);
        onSelection(segmentedValue.value);
    };

    return (
        <LeafSegmentedButtons
            label={strings("inputLabel.triageCode")}
            valueLabel={segmentedValue == null ? strings("triageCode.none") : TriageCode.toString(segmentedValue.value)}
            options={[
                new LeafSegmentedValue(TriageCode.Immediate, "1"),
                new LeafSegmentedValue(TriageCode.Emergency, "2"),
                new LeafSegmentedValue(TriageCode.Urgent, "3"),
                new LeafSegmentedValue(TriageCode.SemiUrgent, "4"),
                new LeafSegmentedValue(TriageCode.NonUrgent, "5"),
            ]}
            value={segmentedValue}
            selectedBackgroundColor={segmentedValue == null ? undefined : LeafColors.triageCode(segmentedValue.value)}
            selectedLabelColor={segmentedValue == null ? undefined : LeafColors.textTriageCode(segmentedValue.value)}
            onSetValue={onSetSegmentedValue}
            style={style}
        />
    );
};

export default TriageCodePicker;
