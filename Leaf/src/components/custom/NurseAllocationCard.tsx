import { View, ViewStyle } from "react-native";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafText from "../base/LeafText/LeafText";
import FloatingContainer from "../containers/FloatingContainer";
import Worker from "../../model/employee/Worker";
import VGap from "../containers/layout/VGap";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import { strings } from "../../localisation/Strings";
import { useEffect, useState } from "react";
import FlatContainer from "../containers/FlatContainer";
import LeafIconButton from "../base/LeafIconButton/LeafIconButton";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafCheckbox from "../base/LeafCheckbox/LeafCheckbox";
import Session from "../../model/session/Session";

interface Props {
    worker: Worker;
    itemIndex: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const NurseAllocationCard: React.FC<Props> = ({ worker, itemIndex, selectedIndex, onSelect }) => {
    // check if allocate button is clicked (false=white, true=green)
    const isSelected = itemIndex === selectedIndex;
    const idText = worker.id.toString();
    const patient = Session.inst.getActivePatient();

    const refreshAllocation = () => {
        if (patient != null && patient.idAllocatedTo != null) {
            for (const allocatedPatientID of worker.allocatedPatients) {
                if (allocatedPatientID.matches(patient.mrn)) {
                    return true;
                }
            }
        }
        return false;
    }

    const [initialValue, setInitialValue] = useState(refreshAllocation());

    const onPressAllocate = (worker: Worker) => {
        //TODO: set allocate nurse to patient
        //TODO: Update patient allocated counter
        if (patient != null) {
            if (initialValue) {
                // deallocate patient
                Session.inst.unallocatePatient(patient, worker);
            
            } else {
                // allocate patient
                Session.inst.allocatePatient(patient, worker);
            }
        }
    };

    return (
        <FlatContainer>
            <HStack>
                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.title3}>{worker.fullName}</LeafText>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>{strings("workerCard.id", `${idText}`)}</LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("workerCard.numPatients", `${worker.allocatedPatients.length}`)}
                    </LeafText>
                </VStack>

                {/* 
                    // TODO: replace with checkbox after merge
                */}
                <LeafCheckbox size={LeafIconSize.Large} initialValue={initialValue} onValueChange={() => {onPressAllocate(worker); onSelect(itemIndex)}}/>
                {/*<LeafIconButton
                    icon={isSelected ? "check" : "plus"}
                    size={LeafIconSize.Large}
                    iconColor={isSelected ? LeafColors.textLight : LeafColors.textDark}
                    color={isSelected ? LeafColors.accent : LeafColors.transparent}
                    onPress={() => {
                        onSelect(itemIndex);
                        onPressAllocate(worker);
                    }}
                    style={{
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isSelected ? LeafColors.textLight.getColor() : LeafColors.textDark.getColor(),
                    }}
                />*/}
            </HStack>
        </FlatContainer>
    );
};

export default NurseAllocationCard;
