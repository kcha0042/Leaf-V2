import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Worker from "../../model/employee/Worker";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import WorkerCard from "../custom/WorkerCard";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import NurseAllocationScreen from "./NurseAllocationScreen";
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";

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
        const unsubscribe = StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
            setFilteredWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();

        return () => {
            unsubscribe();
        };
    }, []);

    const onPressWorker = (worker: Worker) => {
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
                <LeafSearchBar
                    onTextChange={onSearch}
                    data={workers}
                    setData={setFilteredWorkers}
                    dataToString={(worker: Worker) => worker.fullName}
                />

                <VGap size={LeafDimensions.cardTopPadding} />

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
