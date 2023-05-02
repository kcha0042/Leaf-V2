import { ScrollView, Spacer, VStack } from "native-base";
import React, { useEffect } from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import { FlatList } from "native-base";
import PatientCard from "./PatientCard";
import { strings } from "../../localisation/Strings";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkerScreen: React.FC = () => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.instance.getAllPatients());

    StateManager.patientsFetched.subscribe(() => {
        setPatients(Session.instance.getAllPatients());
    });

    useEffect(() => {
        Session.instance.fetchAllPatients();
    }, []);

    const onPressPatient = (patient) => {
        console.log(patient.fullName);
    }

    return (
        <ScrollView 
            flex={1}
            padding={LeafDimensions.screenPadding}
        >
            <VStack 
                flex={1}
                space={LeafDimensions.screenSpacing}
            >
                <LeafText typography={LeafTypography.header}>
                    {strings("header.yourPatients")}
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
                        <Spacer size={LeafDimensions.cardSpacing} />
                    )}
                    scrollEnabled={false}
                    // flexGrow ensures the frame wraps only the FlatList content
                    flexGrow={0}
                    // Stop shadows getting clipped
                    overflow='visible'
                />

                <Spacer />
            </VStack>
        </ScrollView>
    );
}

export default WorkerScreen;