import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import Patient from "../../model/patient/Patient";
import StateManager from "../../state/publishers/StateManager";
import LeafButton from "../base/LeafButton/LeafButton";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import AllocatedPatientsCard from "../custom/AllocatedPatientsCard";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import AllocateNurseToPatientScreen from "./AllocateNurseToPatientScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NurseAllocationScreen: React.FC<Props> = ({ navigation }) => {
    const [allocatedPatients, setAllocatedPatients] = React.useState<Patient[]>([]);
    let worker = Session.inst.getActiveWorker();

    useEffect(() => {
        worker = Session.inst.getActiveWorker();
        const unsubscribePatientsFetched = StateManager.patientsFetched.subscribe(() => {
            refreshAllocatedPatients();
            worker = Session.inst.getActiveWorker();
        });
        const unsubscribePatientUpdated = StateManager.patientUpdated.subscribe(() => {
            refreshAllocatedPatients();
            worker = Session.inst.getActiveWorker();
        });

        refreshAllocatedPatients();
        Session.inst.fetchAllPatients();

        return () => {
            unsubscribePatientUpdated();
            unsubscribePatientsFetched();
        };
    }, []);

    const refreshAllocatedPatients = () => {
        // Find all patients that are allocated to the worker
        const newAllocatedPatients: Patient[] = [];
        if (worker == null) {
            throw new Error("Cannot fetch active worker!");
        }
        for (const allocatedPatientID of worker.allocatedPatients) {
            const allocatedPatient = Session.inst.getPatient(allocatedPatientID);
            if (allocatedPatient != null) {
                newAllocatedPatients.push(allocatedPatient);
            }
        }
        setAllocatedPatients(newAllocatedPatients);
    };

    return (
        <DefaultScreenContainer>
            <VStack spacing={LeafDimensions.screenSpacing} style={{ flex: 1 }}>
                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.title1} style={{ textAlign: "center" }}>
                        {allocatedPatients.length + " "}
                    </LeafText>
                    <LeafText typography={LeafTypography.subscript} style={{ textAlign: "center" }}>
                        {strings("nurseAllocationScreen.subtitle")}
                    </LeafText>
                </VStack>

                <LeafButton
                    label={strings("button.newAllocation")}
                    icon="plus"
                    onPress={() => {
                        NavigationSession.inst.navigateTo(
                            AllocateNurseToPatientScreen,
                            navigation,
                            strings("header.leader.viewPatients"),
                        );
                    }}
                    style={{
                        borderRadius: 15,
                        marginTop: 5,
                        marginBottom: 10,
                    }}
                />

                <VGap size={2} />
                <FlatList
                    data={allocatedPatients}
                    renderItem={({ item: patient }) => <AllocatedPatientsCard patient={patient} />}
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
            </VStack>
        </DefaultScreenContainer>
    );
};

export default NurseAllocationScreen;
