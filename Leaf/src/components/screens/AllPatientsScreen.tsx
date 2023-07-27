import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import StateManager from "../../state/publishers/StateManager";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import PatientCard2 from "../custom/PatientCard2";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import NewAllocationCard from "../custom/NewAllocationCard";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import AllocateToPatientScreen from "../screens/AllocateToPatientScreen";
import { strings } from "../../localisation/Strings";
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllPatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();
    }, []);

    const onPressPatient = (patient) => {
        // TODO: Navigation
        Session.inst.setActivePatient(patient);
        NavigationSession.inst.navigateTo(AllocateToPatientScreen, navigation, strings("header.leader.allocateTo"));
    };

    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
        // TODO: Search for worker using query
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafSearchBar searchQuery={strings("search.underlying")} onSearch={() => {}}></LeafSearchBar>
                <VGap size={10} />
                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => (
                        <PatientCard2
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

export default AllPatientsScreen;
