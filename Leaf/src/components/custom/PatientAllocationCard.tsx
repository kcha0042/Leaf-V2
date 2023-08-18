import { View, ViewStyle } from "react-native";
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

interface Props {
    patient: Patient;
    itemIndex: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const PatientAllocationCard: React.FC<Props> = ({ patient, itemIndex, selectedIndex, onSelect }) => {
    const isSelected = itemIndex === selectedIndex;
    const idText = patient.mrn.toString();
    const session = patient.sessionAllocated.toString();
    const dateText = patient.triageCase.arrivalDate.toDateString();

    const onPressAllocate = (patient) => {
        //TODO: set allocate patient to nurse
        //TODO: Update patient allocated counter
    };

    return (
        <FlatContainer>
            <HStack>
                <TriageCodeBadge
                    code={patient.triageCase.triageCode}
                    fillSpace={false}
                    style={{
                        alignSelf: "flex-start",
                        marginRight: 12,
                    }}
                />

                <VStack style={{ flex: 1 }} spacing={10}>
                    <LeafText typography={LeafTypography.title3}>{patient.fullName}</LeafText>

                    <VGap size={16} />

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("allocateToNurseCard.id", `${idText}`)}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("allocateToNurseCard.date", `${dateText}`)}
                    </LeafText>

                    <LeafText typography={LeafTypography.subscript}>
                        {strings("allocateToNurseCard.session", `${session}`)}
                    </LeafText>
                </VStack>

                {/* 
                    // TODO: replace with checkbox after merge
                */}
                <LeafIconButton
                    icon={isSelected ? "check" : "plus"}
                    size={LeafIconSize.Large}
                    iconColor={isSelected ? LeafColors.textLight : LeafColors.textDark}
                    color={isSelected ? LeafColors.accent : LeafColors.transparent}
                    onPress={() => {
                        onSelect(itemIndex);
                        onPressAllocate(patient);
                    }}
                    style={{
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isSelected ? LeafColors.textLight.getColor() : LeafColors.textDark.getColor(),
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default PatientAllocationCard;
