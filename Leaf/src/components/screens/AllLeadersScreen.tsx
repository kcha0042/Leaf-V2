import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import ManageNurseScreen from "./ManageWorkerScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import Session from "../../model/Session";
import Worker from "../../model/employee/Worker";
import StateManager from "../../state/publishers/StateManager";
import { FlatList, ScrollView, View } from "react-native";
import WorkerCard from "../custom/WorkerCard";
import VGap from "../containers/layout/VGap";
import Spacer from "../containers/layout/Spacer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllLeadersScreen: React.FC<Props> = ({ navigation }) => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();
    }, []);

    const onPressWorker = (worker: Worker) => {
        Session.inst.setActiveWorker(worker);
        NavigationSession.inst.navigateTo(ManageNurseScreen, navigation, worker.fullName);
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

export default AllLeadersScreen;
