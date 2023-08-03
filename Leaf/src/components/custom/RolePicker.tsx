import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import VStack from "../containers/VStack";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import { useState } from "react";
import { Role } from "../../model/employee/Role";
import { strings } from "../../localisation/Strings";

interface Props {
    style?: ViewStyle;
    onSelection: (role: Role) => void;
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
                        new LeafSegmentedValue(Role.Worker, strings("role.worker")),
                        new LeafSegmentedValue(Role.Leader, strings("role.leader")),
                        new LeafSegmentedValue(Role.Admin, strings("role.admin")),
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
