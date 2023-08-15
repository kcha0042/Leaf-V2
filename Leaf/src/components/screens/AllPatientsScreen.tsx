import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
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
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());
    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();
    }, []);

    const onPressPatient = (patient: Patient) => {
        // TODO: Navigation
        Session.inst.setActivePatient(patient);
        NavigationSession.inst.navigateTo(AllocatePatientToNurseScreen, navigation, strings("header.leader.allocateTo"));
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafSearchBarNew onTextChange={onSearch} />

                <VGap size={10} />

                <FlatList
                    data={patients}
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
                    // Don't use overflow prop - doesn't work on web
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

export default AllPatientsScreen;
