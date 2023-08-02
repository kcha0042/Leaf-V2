import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";

import VGap from "../containers/layout/VGap";
import React, { useEffect } from "react";
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";
import Patient from "../../model/patient/Patient";
import Session from "../../model/Session";
import StateManager from "../../state/publishers/StateManager";
import { FlatList } from "react-native";
import AllocateToNurseCard from "../custom/AllocatePatientToNurseCard";
import LeafDimensions from "../styling/LeafDimensions";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocateToNurseScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();
    }, []);

    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
        // TODO: Search for worker using query
    };

    return (
        <DefaultScreenContainer>
            <VStack>
            <LeafSearchBarNew></LeafSearchBarNew>
                <VGap size={20} />
                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => <AllocateToNurseCard patient={patient} />}
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

export default AllocateToNurseScreen;
