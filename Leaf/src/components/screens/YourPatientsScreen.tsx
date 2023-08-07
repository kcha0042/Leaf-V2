import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, ScrollView, View } from "react-native";
import Session from "../../model/session/Session";
import Patient from "../../model/patient/Patient";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientCard from "../custom/PatientCard";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import PatientOptionsScreen from "./PatientOptionsScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const YourPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();
    }, []);

    const onPressPatient = (patient: Patient) => {
        Session.inst.setActivePatient(patient);
        NavigationSession.inst.navigateTo(PatientOptionsScreen, navigation, patient.fullName);
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => (
                        <PatientCard
                            patient={patient}
                            onPress={() => {
                                onPressPatient(patient);
                            }}
                        />
                    )}
                    keyExtractor={(patient) => patient.mrn.toString()}
                    ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                    scrollEnabled={false}
                    // Don't use overflow prop - doesn't work on web
                    style={{
                        width: "100%",
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />

                <Spacer />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default YourPatientsScreen;
