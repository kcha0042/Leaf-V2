import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import Session from "../../model/Session";
import Worker from "../../model/employee/Worker";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import WorkerCard from "../custom/WorkerCard";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

const YourWorkersScreen: React.FC = () => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();
    }, []);

    const onPressWorker = (worker) => {
        // TODO: Navigation
        console.log(worker.firstName); // TODO: Add worker fullname instead of first name
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={workers}
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
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />

                <Spacer />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default YourWorkersScreen;
