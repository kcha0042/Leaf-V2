import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, ScrollView, View } from "react-native";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientCard from "../custom/PatientCard";
import NavigationEnvironment from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import PatientOptionsScreen from "./PatientOptionsScreen";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const YourPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.instance.getAllPatients());

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.instance.getAllPatients());
        });
    }, []);

    useEffect(() => {
        Session.instance.fetchAllPatients();
    }, []);

    const onPressPatient = (patient: Patient) => {
        Session.instance.setActivePatient(patient);
        NavigationEnvironment.inst.navigateTo(PatientOptionsScreen, navigation, patient.fullName);
    };

    return (
        <View
            style={{
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    flex: 1,
                    padding: LeafDimensions.screenPadding,
                }}
            >
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
            </ScrollView>
        </View>
    );
};

export default YourPatientsScreen;
