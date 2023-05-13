import { ScrollView, Spacer, VStack } from "native-base";
import React, { useEffect } from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Worker from "../../model/employee/Worker";
import { FlatList } from "native-base";
import { strings } from "../../localisation/Strings";
import WorkerCard from "./WorkerCard";

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
            flex={1}
            padding={LeafDimensions.screenPadding}
        >
            <VStack 
                flex={1}
                space={LeafDimensions.screenSpacing}
            >
                <LeafText typography={LeafTypography.header}>
                    {strings("header.leader.nurses")}
                </LeafText>

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
                        <Spacer size={LeafDimensions.cardSpacing} />
                    )}
                    scrollEnabled={false}
                    // flexGrow ensures the frame wraps only the FlatList content
                    flexGrow={0}
                    // Stop shadows getting clipped
                    // Don't use overflow prop - doesn't work on web
                    style={{ overflow: 'visible' }}
                />

                <Spacer />
            </VStack>
        </ScrollView>
    );
}

export default YourWorkersScreen;