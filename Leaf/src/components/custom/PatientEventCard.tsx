import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { ViewStyle } from "react-native";
import Patient from "../../model/patient/Patient";
import PatientEvent from "../../model/patient/PatientEvent";
import Session from "../../model/session/Session";
import LeafChip from "../base/LeafChip/LeafChip";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import HGap from "../containers/layout/HGap";
import VGap from "../containers/layout/VGap";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import PatientOptionsScreen from "../screens/PatientOptionsScreen";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
    patient: Patient;
    event: PatientEvent;
    style?: ViewStyle;
    onPress: () => void;
}

const PatientEventCard: React.FC<Props> = ({ navigation, patient, event, style }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDone, setIsDone] = useState(event.completedToday());

    const onToggleDone = async () => {
        Session.inst.markPatientEvent(patient, event, !isDone);
        setIsDone(!isDone);
    };

    return (
        <FlatContainer
            color={LeafColors.fillBackgroundLight}
            style={{
                ...style,
            }}
            onPress={() => {
                setIsExpanded(!isExpanded);
            }}
        >
            <HStack style={{ alignItems: "center" }}>
                <VStack style={{ flex: 1 }}>
                    <LeafText typography={LeafTypography.subscript}>{patient.fullName}</LeafText>

                    <LeafText
                        typography={LeafTypography.title3.withColor(
                            isDone ? LeafColors.textSuccess : LeafColors.textDark,
                        )}
                    >
                        {event.title}
                    </LeafText>

                    <VGap size={12} />

                    <LeafText typography={LeafTypography.subscript.withColor(LeafColors.accent)}>
                        {event.triggerTimeDescription}
                        <LeafText typography={LeafTypography.subscript}>{" • " + event.category.toString()}</LeafText>
                    </LeafText>

                    {isExpanded ? (
                        <VStack>
                            <LeafText typography={LeafTypography.subscript.withColor(LeafColors.textDark)}>
                                {event.description}
                            </LeafText>

                            <VGap size={16} />

                            <HStack>
                                <LeafChip
                                    color={LeafColors.accent}
                                    onPress={() => {
                                        Session.inst.setActivePatient(patient);
                                        NavigationSession.inst.navigateTo(
                                            PatientOptionsScreen,
                                            navigation,
                                            patient.fullName,
                                        );
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    <HStack>
                                        <LeafIcon
                                            icon="chevron-right"
                                            color={LeafColors.textLight}
                                            size={LeafIconSize.Small}
                                        />

                                        <LeafText
                                            typography={LeafTypography.chip}
                                            wide={false}
                                            style={{ paddingRight: 10 }}
                                        >
                                            {"View Patient"}
                                        </LeafText>
                                    </HStack>
                                </LeafChip>

                                <HGap size={8} />

                                <LeafChip
                                    color={isDone ? LeafColors.textSuccess : LeafColors.accent}
                                    onPress={onToggleDone}
                                    style={{ flex: 1, justifyContent: "center" }}
                                >
                                    <HStack>
                                        <LeafText
                                            typography={LeafTypography.chip}
                                            wide={false}
                                            style={{ paddingHorizontal: 10 }}
                                        >
                                            {isDone ? "Done" : "Mark Done"}
                                        </LeafText>
                                    </HStack>
                                </LeafChip>
                            </HStack>
                        </VStack>
                    ) : undefined}
                </VStack>

                {isDone ? (
                    <LeafIcon icon="check-bold" color={LeafColors.textSuccess} size={LeafIconSize.Large} />
                ) : undefined}
            </HStack>
        </FlatContainer>
    );
};

export default PatientEventCard;
