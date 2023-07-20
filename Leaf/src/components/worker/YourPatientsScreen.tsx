import { ScrollView, Spacer, VStack } from "native-base";
import React, { useEffect } from "react";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import { FlatList } from "native-base";
import PatientCard from "./components/PatientCard";
import { View } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import { PatientsNavigationProp } from "./navigation/Params";
import NavigationEnvironment from "../core/navigation/navigators/NavigationEnvironment";
import PatientsScreen from "./PatientsScreen";

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
                flex={1}
                padding={LeafBaseDimensions.screenPadding}
            >
                <VStack 
                    flex={1}
                    space={LeafBaseDimensions.screenSpacing}
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
                            <Spacer size={LeafBaseDimensions.cardSpacing} />
                        )}
                        scrollEnabled={false}
                        // flexGrow ensures the frame wraps only the FlatList content
                        flexGrow={0}
                        // Stop shadows getting clipped
                        // Don't use overflow prop - doesn't work on web
                        style={{ overflow: 'visible' }}
                    />

                    <Spacer />
                </VStack>
            </ScrollView>
        </View>
    );
}

export default YourPatientsScreen;