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
import StateManager from "../../state/publishers/StateManager";
import LeafCheckboxStatic from "../base/LeafCheckbox/LeafCheckboxStatic";

interface Props {
    worker: Worker;
}

const NurseAllocationCard: React.FC<Props> = ({ worker }) => {
    const idText = worker.id.toString();
    let patient = Session.inst.getActivePatient();

    const refreshAllocation = () => {
        patient = Session.inst.getActivePatient();
        if (patient == null || patient.idAllocatedTo == null) return;

        for (const allocatedPatientID of worker.allocatedPatients) {
            if (allocatedPatientID.matches(patient.mrn)) return true;                 
        }

        return false;
    }

    const [isTicked, setIsTicked] = useState(refreshAllocation());

    useEffect(() => {
        StateManager.patientUpdated.subscribe(() => {
            setIsTicked(refreshAllocation());
        })
    }, []);

    const onPressAllocate = async () => {
        if (patient == null) return;
        isTicked ? await Session.inst.unallocatePatient(patient, worker) : await Session.inst.allocatePatient(patient, worker);
        setIsTicked(!isTicked);
        StateManager.reallocationOccured.publish();
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

                <LeafCheckboxStatic size={LeafIconSize.Large} isChecked={isTicked ?? false} initialValue={isTicked} onPress={onPressAllocate}/>
            </HStack>
        </FlatContainer>
    );
};

export default NurseAllocationCard;
