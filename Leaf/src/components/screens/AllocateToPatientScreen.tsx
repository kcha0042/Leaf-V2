import VStack from "../containers/VStack";
import React, { useEffect } from "react";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import VGap from "../containers/layout/VGap";
import LeafDimensions from "../styling/LeafDimensions";
import { FlatList, ScrollView, ViewStyle } from "react-native";
import Worker from "../../model/employee/Worker";
import Session from "../../model/Session";
import AllocateNurseToPatientCard from "../custom/AllocateNurseToPatientCard";
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";
import StateManager from "../../state/publishers/StateManager";
import LeafButton from "../base/LeafButton/LeafButton";
import { strings } from "../../localisation/Strings";
import NewAllocationCard from "../custom/NewAllocationCard";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocateToPatientScreen: React.FC<Props> = ({ navigation }) => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();
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

                <VGap size={25} />

                <FlatList
                    data={workers}
                    renderItem={({ item: worker }) => <AllocateNurseToPatientCard worker={worker} />}
                    keyExtractor={(worker) => worker.id.toString()}
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

export default AllocateToPatientScreen;
