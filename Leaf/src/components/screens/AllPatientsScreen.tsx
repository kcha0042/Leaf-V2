import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Patient from "../../model/patient/Patient";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientCardExtended from "../custom/PatientCardExtended";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import AllocatePatientToNurseScreen from "./AllocatePatientToNurseScreen";
import { strings } from "../../localisation/Strings";
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";
import { ScreenType } from "../../state/environment/types/ScreenType";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());
    const [filteredPatients, setFilteredPatients] = React.useState<Patient[]>(patients);
    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const unsubscribe = StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
            setFilteredPatients(Session.inst.getAllPatients());
        });
        Session.inst.fetchAllWorkers();
        Session.inst.fetchAllPatients();

        return () => {
            unsubscribe();
        };
    }, []);

    const onPressPatient = (patient: Patient) => {
        // TODO: Navigation
        Session.inst.setActivePatient(patient);
        NavigationSession.inst.navigateTo(
            AllocatePatientToNurseScreen,
            navigation,
            strings("header.leader.allocateTo", patient.fullName),
        );
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <ScrollView
                    style={{
                        width: "100%",
                        flex: 1,
                    }}
                >
                    <LeafSearchBar
                        onTextChange={onSearch}
                        data={patients}
                        setData={setFilteredPatients}
                        dataToString={(patient: Patient) => patient.fullName}
                    />

                    <VGap size={LeafDimensions.cardTopPadding} />

                    <FlatList
                        data={filteredPatients}
                        renderItem={({ item: patient }) => (
                            <PatientCardExtended
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
                            ...(Environment.inst.getOS() == OS.Web &&
                            Environment.inst.getScreenType() != ScreenType.Mobile
                                ? { height: Environment.inst.getScreenHeight() - 145 }
                                : {}),
                        }}
                    />
                </ScrollView>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllPatientsScreen;
