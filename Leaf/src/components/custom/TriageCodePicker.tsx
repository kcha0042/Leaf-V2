import { useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { strings } from "../../localisation/Strings";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import LeafColors from "../styling/LeafColors";
import StateManager from "../../state/publishers/StateManager";

interface Props {
    style?: ViewStyle;
    onSelection: (code: TriageCode | undefined) => void;
}

const TriageCodePicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState<LeafSegmentedValue | undefined>(undefined);
    const onSetSegmentedValue = (segmentedValue: LeafSegmentedValue | undefined) => {
        setSegmentedValue(segmentedValue);
        onSelection(segmentedValue?.value);
    };

    useEffect(() => {
        const unsubscribe = StateManager.clearAllInputs.subscribe(() => {
            setSegmentedValue(undefined);
            onSelection(undefined);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const getSelectedBackgroundColor = () => {
        if (segmentedValue == null) {
            return undefined;
        }
        if ((segmentedValue.value as TriageCode).matches(TriageCode.nonUrgent)) {
            return LeafColors.textDark;
        }
        return LeafColors.triageCode(segmentedValue.value);
    };

    const getSelectedLabelColor = () => {
        if (segmentedValue == null) {
            return undefined;
        }
        if ((segmentedValue.value as TriageCode).matches(TriageCode.nonUrgent)) {
            return LeafColors.textLight;
        }
        return LeafColors.textTriageCode(segmentedValue.value);
    };

    return (
        <LeafSegmentedButtons
            label={strings("inputLabel.triageCode")}
            valueLabel={segmentedValue == null ? strings("triageCode.none") : segmentedValue.value.toString()}
            options={[
                new LeafSegmentedValue(TriageCode.immediate, "1"),
                new LeafSegmentedValue(TriageCode.emergency, "2"),
                new LeafSegmentedValue(TriageCode.urgent, "3"),
                new LeafSegmentedValue(TriageCode.semiUrgent, "4"),
                new LeafSegmentedValue(TriageCode.nonUrgent, "5"),
            ]}
            value={segmentedValue}
            selectedBackgroundColor={getSelectedBackgroundColor()}
            selectedLabelColor={getSelectedLabelColor()}
            onSetValue={onSetSegmentedValue}
            style={style}
        />
    );
};

export default TriageCodePicker;
