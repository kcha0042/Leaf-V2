import React, { useEffect } from "react";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import PatientCard from "./components/PatientCard";
import { FlatList, ScrollView, View } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import { PatientsNavigationProp } from "./navigation/Params";
import NavigationEnvironment from "../core/navigation/navigators/NavigationEnvironment";
import PatientsScreen from "./PatientsScreen";
import VStack from "../core/containers/VStack";
import LeafDimensions from "../core/styles/LeafDimensions";
import Spacer from "../core/containers/Spacer";
import VGap from "../core/containers/VGap";

interface Props {
    navigation?: PatientsNavigationProp;
}

const YourPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.instance.getAllPatients());

    StateManager.patientsFetched.subscribe(() => {
        setPatients(Session.instance.getAllPatients());
    });

    useEffect(() => {
        Session.instance.fetchAllPatients();
    }, []);

    const onPressPatient = (patient: Patient) => {
        Session.instance.setActivePatient(patient);
        // navigation.navigate("PATIENT_PREVIEW");
        NavigationEnvironment.inst.navigationTo(PatientsScreen, navigation, patient.fullName);
    }

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
                    padding: LeafDimensions.screenPadding
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
                                onPress={() => {onPressPatient(patient)}}
                            />
                        )}
                        keyExtractor={(patient) => patient.mrn.toString()}
                        ItemSeparatorComponent={() => (
                            <VGap size={LeafDimensions.cardSpacing} />
                        )}
                        scrollEnabled={false}
                        // Don't use overflow prop - doesn't work on web
                        style={{ 
                            width: "100%",
                            overflow: 'visible', // Stop shadows getting clipped
                            flexGrow: 0, // Ensures the frame wraps only the FlatList content
                        }}
                    />

                    <Spacer />
                </VStack>
            </ScrollView>
        </View>
    );
}

export default YourPatientsScreen;