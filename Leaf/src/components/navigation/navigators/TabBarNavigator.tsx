import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HStack from "../../containers/HStack";
import VStack from "../../containers/VStack";
import TabBarItem from "../../custom/TabBarItem";
import CustomLeafHeader from "../CustomHeader";
import { EmptyScreen } from "../EmptyScreen";
import LeafInterface from "../LeafInterface";
import LeafScreen from "../LeafScreen";
import NavigationEnvironment from "./NavigationEnvironment";
import NavigationStateManager from "./NavigationStateManager";

interface Props {
    leafInterface: LeafInterface;
}

export const TabBarNavigator: React.FC<Props> = ({ leafInterface }) => {
    const [screens, setScreens] = useState<LeafScreen[]>([]);

    const Stack = createStackNavigator();

    useEffect(() => {
        NavigationEnvironment.inst.clearScreens();

        NavigationStateManager.newScreenAdded.subscribe(() => {
            setScreens([...NavigationEnvironment.inst.screens]);
        });
    }, []);

    useEffect(() => {
        NavigationEnvironment.inst.loadedNavigation();
        NavigationEnvironment.inst.loadedNavigation = () => {};
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
                    {leafInterface.roots.map((root) => {
                        return <TabBarItem leafStackRoot={root} key={root.id.toString()} />;
                    })}
                </HStack>
            </SafeAreaView>
        </VStack>
    );
};
