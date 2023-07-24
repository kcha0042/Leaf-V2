import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import Worker from "../../model/employee/Worker";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import { useState } from "react";
import { strings } from "../../localisation/Strings";

interface Props {
    style?: ViewStyle;
    onSelection: (code: TriageCode) => void;
}

const TriageCodePicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState(null);
    const onSetSegmentedValue = (value) => {
        setSegmentedValue(value);
        onSelection(value);
    };
    return (
        <View>
            <VStack spacing={8}>
                <LeafText typography={LeafTypography.subscript}>
                    {"Triage Code: "}
                    <LeafText
                        typography={LeafTypography.body.withColor(
                            segmentedValue == null ? LeafColors.textError : LeafColors.triageCode(segmentedValue),
                        )}
                    >
                        {segmentedValue == null ? strings("triageCode.none") : TriageCode.toString(segmentedValue)}
                    </LeafText>
                </LeafText>
                <LeafSegmentedButtons
                    options={[
                        new LeafSegmentedValue(TriageCode.Immediate, "1"),
                        new LeafSegmentedValue(TriageCode.Emergency, "2"),
                        new LeafSegmentedValue(TriageCode.Urgent, "3"),
                        new LeafSegmentedValue(TriageCode.SemiUrgent, "4"),
                        new LeafSegmentedValue(TriageCode.NonUrgent, "5"),
                    ]}
                    value={segmentedValue}
                    selectedBackgroundColor={segmentedValue == null ? undefined : LeafColors.triageCode(segmentedValue)}
                    selectedLabelColor={segmentedValue == null ? undefined : LeafColors.textTriageCode(segmentedValue)}
                    onSetValue={onSetSegmentedValue}
                />
            </VStack>
        </View>
    );
};

export default TriageCodePicker;
