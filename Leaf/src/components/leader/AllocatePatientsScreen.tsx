import React, { useEffect } from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import LeafDimensions from "../styling/LeafDimensions";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import PatientCard from "../custom/PatientCard";
import { strings } from "../../localisation/Strings";
import AllocateCard from "./components/AllocateCard";
import LeafColors from "../styling/LeafColors";
import { FlatList, ScrollView } from "react-native";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";

const AllocatePatientsScreen: React.FC = () => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.instance.getAllPatients());

    //count how many patients the nurse is currently allocated to
    let countPatients = Session.instance.getAllPatients().length;

    StateManager.patientsFetched.subscribe(() => {
        setPatients(Session.instance.getAllPatients());
    });

    useEffect(() => {
        Session.instance.fetchAllPatients();
    }, []);

    const onPressPatient = (patient) => {
        // TODO: Navigation
        console.log(patient.fullName);
    }

    const onPressNewAllocation = () => {
        // TODO: Patient Allocation Page
        console.log("new Allocation");
    }

    return (
        <ScrollView 
            style={{
                flex: 1,
                padding: LeafDimensions.screenPadding,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
            }}
        >
            <VStack 
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.header}>
                    Nabeeb
                </LeafText>

                <AllocateCard
                    onPress={() => {onPressNewAllocation}}
                />
                    
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
                        overflow: 'visible', // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />

                <Spacer />
            </VStack>
        </ScrollView>
    );
}

export default AllocatePatientsScreen;