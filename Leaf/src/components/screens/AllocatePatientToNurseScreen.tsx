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
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";
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

    useEffect(() => {
        const unsubscribeWorkersFetched = StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
            setFilteredWorkers(Session.inst.getAllWorkers());
            StateManager.reallocationOccurred.publish();
        });
        setFilteredWorkers(Session.inst.getAllWorkers());

        const unsubscribeActivePatientChanged = StateManager.activePatientChanged.subscribe(() => {
            setPatient(Session.inst.getActivePatient());
        });

        return () => {
            unsubscribeActivePatientChanged();
            unsubscribeWorkersFetched();
        };
    }, []);

    return (
        <DefaultScreenContainer>
            <VStack
                style={{
                    flex: 1,
                }}
                spacing={LeafDimensions.screenPadding}
            >
                <LeafSearchBar
                    onTextChange={onSearch}
                    data={workers}
                    setData={setFilteredWorkers}
                    dataToString={(worker: Worker) => worker.fullName}
                />

                <FlatList
                    data={filteredWorkers}
                    renderItem={({ item: worker, index: index }) => (
                        <NurseAllocationCard key={worker.id.toString()} worker={worker} />
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
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllocatePatientToNurseScreen;
