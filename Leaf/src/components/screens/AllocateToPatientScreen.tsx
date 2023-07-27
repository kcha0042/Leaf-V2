import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import VGap from "../containers/layout/VGap";
import LeafDimensions from "../styling/LeafDimensions";
import { FlatList, ScrollView } from "react-native";
import Worker from "../../model/employee/Worker";
import React from "react";
import Session from "../../model/Session";
import AllocateNurseToPatientCard from "../custom/AllocateNurseToPatientCard";
import LeafSearchBar from "../base/LeafSearchBar/LeafSearchBar";
import LeafButton from "../base/LeafButton/LeafButton";
import { strings } from "../../localisation/Strings";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllocateToPatientScreen: React.FC<Props> = ({ navigation }) => {
    const [workers, setWorkers] = React.useState<Worker[]>(Session.inst.getAllWorkers());

    return (
        <DefaultScreenContainer>
            <VStack>
                <LeafSearchBar searchQuery={strings("search.underlying")} onSearch={() => {}}></LeafSearchBar>

                <VGap size={20} />

                <FlatList
                    data={workers}
                    renderItem={({ item: worker }) => <AllocateNurseToPatientCard worker={worker} />}
                    keyExtractor={(worker) => worker.id.toString()}
                    ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                    scrollEnabled={false}
                    // Don't use overflow prop - doesn't work on web
                    style={{
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllocateToPatientScreen;
