import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HStack from "../../containers/HStack";
import VStack from "../../containers/VStack";
import TabBarItem from "../components/TabBarItem";
import CustomLeafHeader from "../components/CustomHeader";
import { EmptyScreen } from "../components/EmptyScreen";
import LeafInterface from "../LeafInterface";
import LeafScreen from "../LeafScreen";
import NavigationSession from "../state/NavigationEnvironment";
import NavigationStateManager from "../state/NavigationStateManager";

interface Props {
    leafInterface: LeafInterface;
}

export const TabBarNavigator: React.FC<Props> = ({ leafInterface }) => {
    const [screens, setScreens] = useState<LeafScreen[]>([]);

    const Stack = createStackNavigator();

    useEffect(() => {
        NavigationSession.inst.clearScreens();

        NavigationStateManager.screenStackUpdated.subscribe(() => {
            setScreens([...NavigationSession.inst.screens]);
        });
    }, []);

    useEffect(() => {
        NavigationSession.inst.loadedNavigation();
        NavigationSession.inst.loadedNavigation = () => {};
    }, [screens]);

    return (
        <VStack
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    flex: 1,
                    width: "100%",
                }}
            >
                <SafeAreaView
                    edges={["top"]}
                    style={{
                        flex: 1,
                    }}
                >
                    {screens.length == 0 ? (
                        <EmptyScreen />
                    ) : (
                        <Stack.Navigator>
                            {screens.map((screen, index) => {
                                return (
                                    <Stack.Screen
                                        // Yes, key/name are both id
                                        key={screen.id.toString()}
                                        name={screen.id.toString()}
                                        component={screen.component}
                                        options={({ navigation }) => ({
                                            ...screen.options,
                                            animationEnabled: index > 0,
                                            header: () => (
                                                <CustomLeafHeader
                                                    title={screen.title}
                                                    buttonProps={{
                                                        canGoBack: index > 0,
                                                        navigation: navigation,
                                                    }}
                                                />
                                            ),
                                        })}
                                    />
                                );
                            })}
                        </Stack.Navigator>
                    )}
                </SafeAreaView>
            </View>

            <SafeAreaView edges={["bottom"]}>
                <HStack
                    style={{
                        width: "100%",
                        justifyContent: "space-around",
                        paddingHorizontal: 8,
                    }}
                >
                    {leafInterface.sections.map((section) => {
                        return <TabBarItem interfaceSection={section} key={section.id.toString()} />;
                    })}
                </HStack>
            </SafeAreaView>
        </VStack>
    );
};
