import { Spacer, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import { FlatList } from "native-base";
import PatientCard from "./PatientCard";

const WorkerScreen: React.FC = () => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.instance.getAllPatients());

    StateManager.patientsFetched.subscribe(() => {
        setPatients(Session.instance.getAllPatients());
        console.log(patients.length)
    });

    useEffect(() => {
        Session.instance.fetchAllPatients();
    }, []);

    const onPressPatient = (patient) => {
        console.log(patient.firstName);
    }

    return (
        <VStack style={{ flex: 1 }} space={LeafDimensions.screenSpacing}>
            <LeafText typography={LeafTypography.header}>
                Your Patients
            </LeafText>

            <FlatList
                data={patients}
                renderItem={({ item: patient }) => (
                    <PatientCard 
                        patient={patient} 
                        onPress={onPressPatient}
                    />
                )}
                keyExtractor={(patient) => patient.mrn.toString()}
                ItemSeparatorComponent={() => (
                    <Spacer size={3.5} />
                )}
                flexGrow={0}
                margin={-LeafDimensions.screenPadding}
                padding={LeafDimensions.screenPadding}
            />

            <LeafText
                typography={LeafTypography.body}
                style={{ textAlign: 'center' }}
            >
                TODO: Worker Screen
            </LeafText>

            <LeafButton 
                label="Logout (TEMP)"
                icon="arrow-left-circle"
                typography={LeafTypography.primaryButton}
                type={LeafButtonType.filled} 
                color={LeafColors.accent}
                onPress={() => {
                    StateManager.loginStatus.publish(LoginStatus.loggedOut);
                }}
            />

            <Spacer />
        </VStack>
    );
}

export default WorkerScreen;