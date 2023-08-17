import VStack from "../containers/VStack";
import React, { useEffect } from "react";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VGap from "../containers/layout/VGap";
import LeafDimensions from "../styling/LeafDimensions";
import { FlatList, ScrollView, ViewStyle } from "react-native";
import Worker from "../../model/employee/Worker";
import Session from "../../model/Session";
import NurseAllocationCard from "../custom/NurseAllocationCard";
import StateManager from "../../state/publishers/StateManager";
import LeafSearchBarNew from "../base/LeafSearchBar/LeafSearchBarNew";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocatePatientToNurseScreen: React.FC<Props> = ({ navigation }) => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());
    const [searchQuery, setSearchQuery] = React.useState("");
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setWorkers(Session.inst.getAllWorkers());
        });

        Session.inst.fetchAllWorkers();
    }, []);

    // logic for checking workers allocated to the patients
    // Not used for now but will use it when the database is ready
    const patient = Session.inst.getActivePatient();
    let allocatedWorker;
    console.log(patient.firstName);

    for (let i = 0; i < workers.length; i++) {
        for (let j = 0; j < workers[i].allocatedPatients.length; j++){
            if (patient.mrn.matches(workers[i].allocatedPatients[j])){
                allocatedWorker = workers[i].id;
                console.log(allocatedWorker);
            }
        }
    }

    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafSearchBarNew onTextChange={onSearch} />

                <VGap size={25} />

                <FlatList
                    data={workers}
                    renderItem={({ item: worker }) => <NurseAllocationCard worker={worker}/>}
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
