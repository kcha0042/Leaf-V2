import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Patient from "../../model/patient/Patient";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import AllocateCard from "../custom/AllocateCard";
import PatientCard from "../custom/PatientCard";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import LeafButton from "../base/LeafButton/LeafButton";
import { useNotificationSession } from "../base/LeafDropNotification/NotificationSession";

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

    const onPressPatient = (patient: Patient) => {
        // TODO: Navigation
        console.log(patient.fullName);
    };

    const onPressNewAllocation = () => {
        // TODO: Patient Allocation Page
        console.log("new Allocation");
    };
    const { showNotification } = useNotificationSession();
    const handleShowNotification = () => {
    showNotification('Hello!','This is a notification message.', LeafTypography.buttonSmall, "alert-box-outline");
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
                <LeafButton label="Show notification" onPress={handleShowNotification}/>
                {/*<LeafDropNotification isVisible={notificationVisible} title="Hello!" message="This is a notification" onClose={closeNotification}/>*/}
                
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
