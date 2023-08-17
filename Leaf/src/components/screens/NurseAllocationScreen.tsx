import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import VGap from "../containers/layout/VGap";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import AllocateNurseToPatientScreen from "./AllocateNurseToPatientScreen";
import { strings } from "../../localisation/Strings";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import React, { useEffect } from "react";
import StateManager from "../../state/publishers/StateManager";
import AllocatedPatientsCard from "../custom/AllocatedPatientsCard";
import LeafDimensions from "../styling/LeafDimensions";
import { FlatList } from "react-native";
import HStack from "../containers/HStack";
import LeafButton from "../base/LeafButton/LeafButton";
import LeafIconButton from "../base/LeafIconButton/LeafIconButton";
import LeafColors from "../styling/LeafColors";
import Spacer from "../containers/layout/Spacer";

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
            <VStack spacing={LeafDimensions.screenSpacing} style={{ flex: 1 }}>
                {/* <HStack spacing={20} style={{ alignItems: "center" }}>
                    <VStack>
                        <LeafText typography={LeafTypography.title1} style={{ textAlignVertical: "bottom" }}>
                            {worker.allocatedPatients.length + " "}
                        </LeafText>
                        <LeafText typography={LeafTypography.subscript} style={{ textAlignVertical: "bottom" }}>
                            {strings("nurseAllocationScreen.subtitle")}
                        </LeafText>
                    </VStack>
                    <Spacer/>
                    <LeafIconButton
                        icon={"plus"}
                        onPress={() => {
                            NavigationSession.inst.navigateTo(
                                AllocateNurseToPatientScreen,
                                navigation,
                                strings("header.leader.viewPatients"),
                            );
                        }}
                        color={LeafColors.accent}
                        size={45}
                    />
                </HStack> */}
                <VStack
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.title1} style={{ textAlign: "center" }}>
                        {worker.allocatedPatients.length + " "}
                    </LeafText>
                    <LeafText typography={LeafTypography.subscript} style={{ textAlign: "center"}}>
                        {strings("nurseAllocationScreen.subtitle")}
                    </LeafText>
                </VStack>

                <LeafButton
                    label={"Allocate"}
                    onPress={() => {
                        NavigationSession.inst.navigateTo(
                            AllocateNurseToPatientScreen,
                            navigation,
                            strings("header.leader.viewPatients"),
                        );
                    }}

                />
                
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
