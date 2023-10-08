import Patient from "../../model/patient/Patient";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import TriageCodeBadge from "./TriageCodeBadge";
import { strings } from "../../localisation/Strings";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafIconButton from "../base/LeafIconButton/LeafIconButton";
import { useEffect, useState } from "react";
import { ShiftTime } from "../../model/employee/ShiftTime";
import Session from "../../model/session/Session";
import LeafChip from "../base/LeafChip/LeafChip";
import StateManager from "../../state/publishers/StateManager";

interface Props {
    patient: Patient;
}

const PatientAllocationCard: React.FC<Props> = ({ patient }) => {
    const idText = patient.mrn.toString();
    let session = patient.sessionAllocated;
    const isAllocated = session.matches(ShiftTime.none);
    const dateText = patient.triageCase.arrivalDate.toDateString();
    let worker = Session.inst.getActiveWorker();

    const refreshAllocation = () => {
        worker = Session.inst.getActiveWorker();
        let updatedPatient = Session.inst.getPatient(patient.mrn);
        if (updatedPatient != null) {
            patient = updatedPatient;
        }
        session = patient.sessionAllocated;
        if (worker != null && patient.idAllocatedTo != null) {
            const allocatedPatients = Session.inst.getAllocatedPatientsTo(worker);
            for (const allocatedPatient of allocatedPatients) {
                if (allocatedPatient.mrn.matches(patient.mrn)) return true;
            }
        }

        return false;
    };

    useEffect(() => {
        const unsubscribeReallocationOccured = StateManager.reallocationOccurred.subscribe(() => {
            setInitialValue(refreshAllocation());
        });
        setInitialValue(refreshAllocation());
        return () => {
            unsubscribeReallocationOccured();
            // session = patient.sessionAllocated;
        };
    }, []);

    const [initialValue, setInitialValue] = useState(refreshAllocation());

    const typography = LeafTypography.subscriptLabel;
    typography.leafColor = LeafColors.textDark;

    const onPressAllocate = async () => {
        if (worker == null) return;
        initialValue
            ? await Session.inst.unallocatePatient(patient, worker)
            : await Session.inst.allocatePatient(patient, worker);
        setInitialValue(!initialValue);
    };

    const formatTime = (date: Date): string => {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return `${hours < 10 ? "0".concat(hours.toString()) : hours.toString()}:${
            minutes < 10 ? "0".concat(minutes.toString()) : minutes.toString()
        }`;
    };

    return (
        <FlatContainer>
            <HStack
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: "flex-start",
                        marginRight: 12,
                    }}
                />

                <VStack style={{ flex: 1 }}>
                    <LeafText typography={LeafTypography.title3}>{patient.fullName}</LeafText>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("allocateToNurseCard.id", `${idText}`)}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("allocateToNurseCard.date", `${dateText}`)}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript.withColor(LeafColors.sessionAllocated(session))}>
                        {isAllocated ? strings("label.notAllocated") : strings("label.lastAllocated", `${session}`)}
                    </LeafText>

                    <VGap size={16} />
                    <HStack spacing={10}>
                        {patient.events.map((event) => (
                            <LeafChip
                                key={event.id.toString()}
                                children={
                                    <LeafText
                                        wide={false}
                                        typography={typography}
                                    >{`${event.title.toString()} @ ${formatTime(event.triggerTime)}`}</LeafText>
                                }
                                color={LeafColors.fillBackgroundAccent}
                            />
                        ))}
                    </HStack>
                </VStack>

                <LeafIconButton
                    icon={initialValue ? "check" : "plus"}
                    size={LeafIconSize.Large}
                    iconColor={initialValue ? LeafColors.textLight : LeafColors.textDark}
                    color={initialValue ? LeafColors.accent : LeafColors.transparent}
                    onPress={onPressAllocate}
                    style={{
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: initialValue ? LeafColors.textLight.getColor() : LeafColors.textDark.getColor(),
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default PatientAllocationCard;
