import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import VStack from "../containers/VStack";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import { useState } from "react";
import { Role } from "../../model/employee/Role";
import { strings } from "../../localisation/Strings";

interface Props {
    style?: ViewStyle;
    onSelection: (role: Role | undefined) => void;
}

const RolePicker: React.FC<Props> = ({ style, onSelection }) => {
    const [segmentedValue, setSegmentedValue] = useState<LeafSegmentedValue | undefined>(undefined);
    const onSetSegmentedValue = (value: LeafSegmentedValue | undefined) => {
        setSegmentedValue(value);
        onSelection(value?.value);
    };

    return (
        <View style={style}>
            <VStack spacing={8}>
                <LeafSegmentedButtons
                    label={strings("label.selectRole")}
                    options={[
                        new LeafSegmentedValue(Role.worker, Role.worker.toString()),
                        new LeafSegmentedValue(Role.leader, Role.leader.toString()),
                        new LeafSegmentedValue(Role.admin, Role.admin.toString()),
                    ]}
                    value={segmentedValue}
                    selectedBackgroundColor={segmentedValue == undefined ? undefined : LeafColors.accent}
                    selectedLabelColor={
                        segmentedValue == undefined ? undefined : LeafColors.textTriageCode(segmentedValue.value)
                    }
                    onSetValue={onSetSegmentedValue}
                />
            </VStack>
        </View>
    );
};

export default RolePicker;
