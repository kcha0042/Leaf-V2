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
import { useState } from "react";

interface Props {
    patient: Patient;
}

const PatientAllocationCard: React.FC<Props> = ({ patient }) => {
    const idText = patient.mrn.toString();
    const session = patient.sessionAllocated;
    const dateText = patient.triageCase.arrivalDate.toDateString();

    const [selected, setSelected] = useState(false);

    const typography = LeafTypography.subscriptLabel;
    typography.leafColor = LeafColors.accent;

    const onPressAllocate = (patient) => {
        //TODO: set allocate patient to nurse
        //TODO: Update patient allocated counter
    };

    return (
        <FlatContainer>
            <HStack
                style={{
                    flex: 1
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
                        {strings("allocateToNurseCard.session", `${session}`)}
                    </LeafText>

                    <VGap size={16}/>
                    <HStack spacing={10}>
                        {
                            patient.events.map(event => (
                                <View
                                    key={event.id.toString()}
                                    style={{
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: typography.color,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        alignSelf: "flex-start"
                                    }}
                                >
                                    <LeafText wide={false} typography={typography}>{event.title.toString()}</LeafText>
                                </View>
                            ))
                        }
                    </HStack>
                </VStack>

                {/* 
                    // TODO: replace with checkbox after merge
                */}
                <LeafIconButton
                    icon={selected ? "check" : "plus"}
                    size={LeafIconSize.Large}
                    iconColor={selected ? LeafColors.textLight : LeafColors.textDark}
                    color={selected ? LeafColors.accent : LeafColors.transparent}
                    onPress={() => {
                        setSelected(!selected);
                        onPressAllocate(patient);
                    }}
                    style={{
                        alignSelf: "center",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: selected ? LeafColors.textLight.getColor() : LeafColors.textDark.getColor(),
                    }}
                />
            </HStack>
        </FlatContainer>
    );
};

export default PatientAllocationCard;
