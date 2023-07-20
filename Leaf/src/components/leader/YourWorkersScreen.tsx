import React, { useEffect } from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import LeafDimensions from "../styling/LeafDimensions";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Worker from "../../model/employee/Worker";
import { strings } from "../../localisation/Strings";
import WorkerCard from "./components/WorkerCard";
import LeafColors from "../styling/LeafColors";
import { FlatList, ScrollView } from "react-native";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";

const YourWorkersScreen: React.FC = () => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.instance.getAllWorkers());

    StateManager.workersFetched.subscribe(() => {
        setWorkers(Session.instance.getAllWorkers());
    });

    useEffect(() => {
        Session.instance.fetchAllWorkers();
    }, []);

    const onPressWorker = (worker) => {
        // TODO: Navigation
        console.log(worker.firstName); // TODO: Add worker fullname instead of first name
    }

    return (
        <ScrollView 
            style={{
                flex: 1,
                padding: LeafDimensions.screenPadding,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
            }}
        >
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
                            onPress={() => {onPressWorker(worker)}}
                        />
                    )}
                    keyExtractor={(worker) => worker.id.toString()}
                    ItemSeparatorComponent={() => (
                        <VGap size={LeafDimensions.cardSpacing} />
                    )}
                    scrollEnabled={false}
                    // Don't use overflow prop - doesn't work on web
                    style={{ 
                        overflow: 'visible', // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />

                <Spacer />
            </VStack>
        </ScrollView>
    );
}

export default YourWorkersScreen;