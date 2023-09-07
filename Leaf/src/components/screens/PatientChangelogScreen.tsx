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
    const [changelogPoints, setChangelogPoints] = React.useState<ChangelogPoint[]>([]);

    useEffect(() => {
        const unsubscribe = StateManager.activePatientChanged.subscribe(() => {
            const newPatient = Session.inst.getActivePatient();
            if (newPatient == null) {
                NavigationSession.inst.navigateBack(navigation);
            } else {
                setPatient(newPatient);
            }
            retrieveChangelogPoints();
        });

        retrieveChangelogPoints();

        return () => {
            unsubscribe();
        };
    }, []);

    if (!patient) {
        return <ErrorScreen />;
    }

    const retrieveChangelogPoints = async () => {
        // TODO: Right now this is fine, but one day when there are a LOT of
        // workers and leaders, this won't be suitable - we will need to
        // fetch all the needed workers and leaders by id instead of just
        // grabbing all of them.
        await Promise.all([Session.inst.fetchAllWorkers(), Session.inst.fetchAllLeaders()]);
        const points = await patient.changelog.generateTimeline(
            patient.events,
            Session.inst.getAllHashedWorkers(),
            Session.inst.getAllHashedLeaders(),
        );
        setChangelogPoints(points);
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.cardSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={changelogPoints}
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
