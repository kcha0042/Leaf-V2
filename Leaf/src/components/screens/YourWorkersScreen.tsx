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

const YourWorkersScreen: React.FC = () => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());

    useEffect(() => {
        const unsubscribe = StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();

        return () => {
            unsubscribe();
        };
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
