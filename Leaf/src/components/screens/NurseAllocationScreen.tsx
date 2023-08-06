import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import NewAllocationCard from "../custom/NewAllocationCard";
import VGap from "../containers/layout/VGap";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import AllocateToNurseScreen from "./AllocateToNurseScreen";
import { strings } from "../../localisation/Strings";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import React, { useEffect } from "react";
import StateManager from "../../state/publishers/StateManager";
import AllocatedPatientsCard from "../custom/AllocatedPatientsCard";
import LeafDimensions from "../styling/LeafDimensions";
import { FlatList } from "react-native";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NurseAllocationScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();
    }, []);

    let allocatedPatients: Patient[] = [];

    const worker = Session.inst.getActiveWorker();

    for (let i = 0; i < patients.length; i++) {
        for (let j = 0; j < worker.allocatedPatients.length; j++) {
            if (patients[i].mrn.matches(worker.allocatedPatients[j])) {
                allocatedPatients.push(patients[i]);
            }
        }
    }

    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                    {"NURSE     " + worker.allocatedPatients.length + " patients allocated"}
                </LeafText>

                <VGap size={20} />
                <NewAllocationCard
                    onPress={() => {
                        NavigationSession.inst.navigateTo(
                            AllocateToNurseScreen,
                            navigation,
                            strings("header.leader.viewPatients"),
                        );
                    }}
                />

                <VGap size={20} />
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
