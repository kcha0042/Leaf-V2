import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { strings } from "../../../localisation/Strings";
import LeafText from "../../base/LeafText/LeafText";
import HStack from "../../containers/HStack";
import VStack from "../../containers/VStack";
import DrawerItem from "../../custom/DrawerItem";
import LeafTypography from "../../styling/LeafTypography";
import CustomLeafHeader from "../CustomHeader";
import { EmptyScreen } from "../EmptyScreen";
import LeafInterface from "../LeafInterface";
import LeafScreen from "../LeafScreen";
import NavigationEnvironment from "./NavigationEnvironment";
import NavigationStateManager from "./NavigationStateManager";

interface Props {
    leafInterface: LeafInterface;
}

const DrawerNavigator: React.FC<Props> = ({ leafInterface }) => {
    const [sidebar, setSidebar] = useState<JSX.Element | undefined>(undefined);
    const [screens, setScreens] = useState<LeafScreen[]>([]);

    const Stack = createStackNavigator();

    useEffect(() => {
        NavigationStateManager.sidebarComponentChanged.subscribe(() => {
            setSidebar(NavigationEnvironment.inst.sidebarComponent);
        });

        NavigationStateManager.newScreenAdded.subscribe(() => {
            setScreens([...NavigationEnvironment.inst.screens]);
        });
    }, []);

    useEffect(() => {
        NavigationEnvironment.inst.loadedNavigation();
        NavigationEnvironment.inst.loadedNavigation = () => {};
    }, [screens]);

    return (
        <HStack
            style={{
                flex: 1,
            }}
        >
            <VStack
                style={{
                    height: "100%",
                    width: "20%",
                    borderRightWidth: 0.5,
                    borderRightColor: "gray",
                    padding: 16,
                }}
            >
                <SafeAreaView style={{ width: "100%" }}>
                    <LeafText
                        typography={LeafTypography.drawerTitle}
                        style={{
                            paddingTop: 4,
                            paddingLeft: 8,
                            paddingBottom: 16,
                        }}
                    >
                        {strings("appName")}
                    </LeafText>

                    {leafInterface.roots.map((root, index) => {
                        return <DrawerItem leafStackRoot={root} key={root.id.toString()} />;
                    })}
                </SafeAreaView>
            </VStack>

            {sidebar == undefined ? undefined : (
                <VStack
                    style={{
                        height: "100%",
                        width: "25%",
                        borderRightWidth: 0.5,
                        borderRightColor: "gray",
                    }}
                >
                    <SafeAreaView style={{ flex: 1, width: "100%" }}>
                        <VStack style={{ flex: 1, width: "100%" }}>
                            <LeafText
                                typography={LeafTypography.header.withSize(24)}
                                style={{
                                    textAlign: "center",
                                    paddingTop: 12,
                                }}
                            >
                                {NavigationEnvironment.inst.sidebarHeader}
                            </LeafText>

                            {sidebar}
                        </VStack>
                    </SafeAreaView>
                </VStack>
            )}

            <View
                style={{
                    height: "100%",
                    width: sidebar == undefined ? "80%" : "55%",
                }}
            >
                <SafeAreaView
                    style={{
                        height: "100%",
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
                                        key={screen.id}
                                        name={screen.id}
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
        </HStack>
    );
};

export default DrawerNavigator;
