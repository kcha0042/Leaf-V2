import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import VStack from "../containers/VStack";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import { useState } from "react";

interface Props {
    style?: ViewStyle;
    onSelection: (code: TriageCode) => void;
}

const RolePicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState(null);
    const onSetSegmentedValue = (value) => {
        setSegmentedValue(value);
        onSelection(value);
    };
    return (
        <View>
            <VStack spacing={8}>
                <LeafSegmentedButtons
                    options={[
                        new LeafSegmentedValue(1, "Nurse"),
                        new LeafSegmentedValue(2, "Leader"),
                        new LeafSegmentedValue(3, "Admin"),
                    ]}
                    value={segmentedValue}
                    selectedBackgroundColor={segmentedValue == null ? undefined : LeafColors.accent}
                    selectedLabelColor={segmentedValue == null ? undefined : LeafColors.textTriageCode(segmentedValue)}
                    onSetValue={onSetSegmentedValue}
                />
            </VStack>
        </View>
    );
};

export default RolePicker;
