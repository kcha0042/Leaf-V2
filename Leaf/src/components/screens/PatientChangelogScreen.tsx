import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafText from "../base/LeafText/LeafText";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LabeledText from "../custom/LabeledText";
import PatientInfoCard from "../custom/PatientInfoCard";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { ErrorScreen } from "./ErrorScreen";
import StateManager from "../../state/publishers/StateManager";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import Patient from "../../model/patient/Patient";
import { FlatList } from "react-native-gesture-handler";
import ChangelogPoint from "../../model/patient/ChangelogPoint";
import FlatContainer from "../containers/FlatContainer";
import LeafChip from "../base/LeafChip/LeafChip";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientChangelogScreen: React.FC<Props> = ({ navigation }) => {
    const [patient, setPatient] = React.useState<Patient | null>(Session.inst.getActivePatient());

    useEffect(() => {
        const unsubscribe = StateManager.activePatientChanged.subscribe(() => {
            const newPatient = Session.inst.getActivePatient();
            if (newPatient == null) {
                NavigationSession.inst.navigateBack(navigation);
            } else {
                setPatient(newPatient);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (!patient) {
        return <ErrorScreen />;
    }

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.cardSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={patient.changelog.generateTimeline()}
                    renderItem={({ item: changelogPoint }) => (
                        <FlatContainer>
                            <HStack spacing={12}>
                                <LeafChip color={LeafColors.textDark} style={{ borderRadius: 8 }}>
                                    <LeafText typography={LeafTypography.chip}>
                                        {changelogPoint.dateDescription}
                                    </LeafText>
                                </LeafChip>

                                <LeafText wide={false}>{changelogPoint.description}</LeafText>
                            </HStack>
                        </FlatContainer>
                    )}
                    keyExtractor={(changelogPoint: ChangelogPoint) => changelogPoint.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                width: 4,
                                height: 22,
                                backgroundColor: LeafColors.textDark.getColor(),
                                marginLeft: 20,
                                alignSelf: "center",
                            }}
                        />
                    )}
                    scrollEnabled={false}
                    style={{
                        width: "100%",
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientChangelogScreen;
