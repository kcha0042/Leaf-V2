import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import Session from "../../model/session/Session";
import Patient from "../../model/patient/Patient";
import StateManager from "../../state/publishers/StateManager";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientCard from "../custom/PatientCard";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import AllocateCard from "../custom/AllocateCard";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

const AllocatePatientsScreen: React.FC = () => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        const unsubscribe = StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();

        return () => {
            unsubscribe();
        };
    }, []);

    const onPressPatient = (patient) => {
        // TODO: Navigation
        console.log(patient.fullName);
    };

    const onPressNewAllocation = () => {
        // TODO: Patient Allocation Page
        console.log("new Allocation");
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.headerScreen}>TODO</LeafText>

                <AllocateCard
                    onPress={() => {
                        onPressNewAllocation;
                    }}
                />

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
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />

                <Spacer />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllocatePatientsScreen;
