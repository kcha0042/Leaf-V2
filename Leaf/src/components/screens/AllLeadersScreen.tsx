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
import ManageLeaderScreen from "./ManageLeaderScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import Session from "../../model/Session";
import Leader from "../../model/employee/Leader";
import StateManager from "../../state/publishers/StateManager";
import { FlatList, ScrollView, View } from "react-native";
import LeaderCard from "../custom/LeaderCard";
import VGap from "../containers/layout/VGap";
import Spacer from "../containers/layout/Spacer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllLeadersScreen: React.FC<Props> = ({ navigation }) => {
    const [leaders, setLeaders] = React.useState<Leader[]>(Session.inst.getAllLeaders());

    useEffect(() => {
        StateManager.leadersFetched.subscribe(() => {
            setLeaders(Session.inst.getAllLeaders());
        });

        Session.inst.fetchAllLeaders();
    }, []);

    const onPressLeader = (leader: Leader) => {
        Session.inst.setActiveLeader(leader);
        NavigationSession.inst.navigateTo(ManageLeaderScreen, navigation, leader.fullName);
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
                    data={leaders}
                    renderItem={({ item: leader }) => (
                        <LeaderCard
                            leader={leader}
                            onPress={() => {
                                onPressLeader(leader);
                            }}
                        />
                    )}
                    keyExtractor={(leader) => leader.id.toString()}
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

export default AllLeadersScreen;
