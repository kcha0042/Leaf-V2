import VStack from "../containers/VStack";
import React, { useEffect, useState } from "react";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VGap from "../containers/layout/VGap";
import LeafDimensions from "../styling/LeafDimensions";
import { FlatList } from "react-native";
import Worker from "../../model/employee/Worker";
import Session from "../../model/session/Session";
import NurseAllocationCard from "../custom/NurseAllocationCard";
import StateManager from "../../state/publishers/StateManager";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";
interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocatePatientToNurseScreen: React.FC<Props> = ({ navigation }) => {
    const [patient, setPatient] = useState(Session.inst.getActivePatient());
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());
    const [filteredWorkers, setFilteredWorkers] = React.useState<Worker[]>(workers);
    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };
    const [selectedIndex, setSelectedIndex] = React.useState(NaN);

    useEffect(() => {
        Session.inst.fetchAllWorkers();
        StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
            setFilteredWorkers(Session.inst.getAllWorkers());
        });
        setFilteredWorkers(Session.inst.getAllWorkers());

        StateManager.activePatientChanged.subscribe(() => {
            setPatient(Session.inst.getActivePatient());
        });

    }, []);

    return (
        <DefaultScreenContainer>
            <VStack
                style={{
                    flex: 1,
                }}
                spacing={20}
            >
               
                <LeafSearchBarNew
                    onTextChange={onSearch}
                    data={workers}
                    setData={setFilteredWorkers}
                    dataToString={(worker: Worker) => worker.fullName}
                />

                <FlatList
                    data={filteredWorkers}
                    renderItem={({ item: worker, index: index }) => (
                        <NurseAllocationCard
                            worker={worker}
                            itemIndex={index}
                            selectedIndex={selectedIndex}
                            onSelect={setSelectedIndex}
                        />
                    )}
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

export default AllocatePatientToNurseScreen;
