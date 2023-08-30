import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import Patient from "../../model/patient/Patient";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientCard from "../custom/PatientCard";
import PatientsPicker from "../custom/PatientsPicker";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafDimensions from "../styling/LeafDimensions";
import PatientOptionsScreen from "./PatientOptionsScreen";
import PatientPreviewScreen from "./PatientPreviewScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const YourPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = useState<Patient[]>(Session.inst.getAllocatedPatients());
    const [showAllPatients, setShowAllPatients] = useState<boolean>(false);
    // Use a reference within the callback closure
    // If we just reference the useState value, its literal gets captured rather than its reference
    const showAllPatientsRef = useRef(showAllPatients);

    useEffect(() => {
        const unsubscribe = StateManager.patientsFetched.subscribe(() => {
            // Whenever any patients are fetched, update the list of patients
            // (Based on whether we want to display allocated or all patients)
            setPatients(
                showAllPatientsRef.current ? Session.inst.getAllPatients() : Session.inst.getAllocatedPatients(),
            );
        });

        // By default we start by showing all allocated patients
        // so immediately do a fetch upon page load
        Session.inst.fetchAllocatedPatients();

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        // Whenever we change between showing allocated/all patients
        // 1. Update the reference
        showAllPatientsRef.current = showAllPatients;
        // 2. Immediately update the list with cached patients
        setPatients(showAllPatientsRef.current ? Session.inst.getAllPatients() : Session.inst.getAllocatedPatients());
        // 3. Fetch patients based on what we want to show
        if (showAllPatients) {
            Session.inst.fetchAllPatients();
        } else {
            Session.inst.fetchAllocatedPatients();
        }
    }, [showAllPatients]);

    const onSelection = (showAll: boolean) => {
        setShowAllPatients(showAll);
        Session.inst.setActivePatient(null);
    };

    const onPressPatient = (patient: Patient) => {
        Session.inst.setActivePatient(patient);
        NavigationSession.inst.navigateTo(
            showAllPatients ? PatientPreviewScreen : PatientOptionsScreen,
            navigation,
            patient.fullName,
        );
    };

    return (
        <DefaultScreenContainer>
            <VStack
                style={{
                    flex: 1,
                }}
            >
                <PatientsPicker onSelection={onSelection} />

                <VGap size={LeafDimensions.cardSpacing} />

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
