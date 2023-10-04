import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Leader from "../../model/employee/Leader";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import LeaderCard from "../custom/LeaderCard";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafDimensions from "../styling/LeafDimensions";
import ManageLeaderScreen from "./ManageLeaderScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllLeadersScreen: React.FC<Props> = ({ navigation }) => {
    const [leaders, setLeaders] = React.useState<Leader[]>(Session.inst.getAllLeaders());

    useEffect(() => {
        const unsubscribe = StateManager.leadersFetched.subscribe(() => {
            setLeaders(Session.inst.getAllLeaders());
        });

        Session.inst.fetchAllLeaders();

        return () => {
            unsubscribe();
        };
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
                        ...(Environment.inst.getOS() == OS.Web ? {height: Environment.inst.getScreenHeight() - 100} : {})
                    }}
                />
                <Spacer />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllLeadersScreen;
