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
    let allocatedPatients = Session.inst.getAllocatedPatientsTo(worker);

    const refreshAllocation = () => {
        patient = Session.inst.getActivePatient();
        let updatedWorker = Session.inst.getWorker(worker.id);
        if (updatedWorker != null) {
            worker = updatedWorker;
        }
        if (patient == null || patient.idAllocatedTo == null) return false;

        allocatedPatients = Session.inst.getAllocatedPatientsTo(worker);
        for (const allocatedPatient of allocatedPatients) {
            if (allocatedPatient.mrn.matches(patient.mrn)) return true;
        }

        return false;
    };

    const [isTicked, setIsTicked] = useState<boolean>(refreshAllocation());

    useEffect(() => {
        const unsubscribeReallocationOccured = StateManager.reallocationOccurred.subscribe(() => {
            setIsTicked(refreshAllocation());
        });
        return () => {
            unsubscribeReallocationOccured();
        };
    }, []);

    const onPressAllocate = async () => {
        if (patient == null) return;
        isTicked
            ? await Session.inst.unallocatePatient(patient, worker)
            : await Session.inst.allocatePatient(patient, worker);
        setIsTicked(!isTicked);
    };

    return (
        <FlatContainer>
            <HStack
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.title3}>{worker.fullName}</LeafText>

                    <VGap size={8} />

                    <LeafText typography={LeafTypography.subscript}>{strings("workerCard.id", `${idText}`)}</LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("workerCard.numPatients", `${allocatedPatients.length}`)}
                    </LeafText>
                </VStack>

                {/*<LeafCheckboxStatic
                    size={LeafIconSize.Large}
                    isChecked={isTicked}
                    initialValue={isTicked}
                    onPress={onPressAllocate}
                />*/}
                <LeafIconButton
                    icon={isTicked ? "check" : "plus"}
                    size={LeafIconSize.Large}
                    iconColor={isTicked ? LeafColors.textLight : LeafColors.textDark}
                    color={isTicked ? LeafColors.accent : LeafColors.transparent}
                    onPress={onPressAllocate}
                    style={{
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isTicked ? LeafColors.textLight.getColor() : LeafColors.textDark.getColor(),
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default NurseAllocationCard;
