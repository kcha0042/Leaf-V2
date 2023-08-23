import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import Session from "../../model/Session";
import Worker from "../../model/employee/Worker";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import LeafDimensions from "../styling/LeafDimensions";
import WorkerCard from "../custom/WorkerCard";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import NurseAllocationScreen from "./NurseAllocationScreen";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllWorkersScreen: React.FC<Props> = ({ navigation }) => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());
    const [filteredWorkers, setFilteredWorkers] = React.useState<Worker[]>(workers);
    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
            setFilteredWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();
    }, []);

    const onPressWorker = (worker) => {
        Session.inst.setActiveWorker(worker);
        NavigationSession.inst.navigateTo(NurseAllocationScreen, navigation, worker.fullName);
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafSearchBarNew
                    onTextChange={onSearch}
                    data={workers}
                    setData={setFilteredWorkers}
                    dataToString={(worker: Worker) => worker.fullName}
                />

                <VGap size={10} />

                <FlatList
                    data={filteredWorkers}
                    renderItem={({ item: worker }) => (
                        <WorkerCard
                            worker={worker}
                            onPress={() => {
                                onPressWorker(worker);
                            }}
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

                <Spacer />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllWorkersScreen;
