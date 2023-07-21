import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
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
import LeafButton from "../../base/LeafButton/LeafButton";
import LeafIconButton from "../../base/LeafIconButton/LeafIconButton";
import LeafColor from "../../styling/color/LeafColor";
import LeafColors from "../../styling/LeafColors";
import Environment from "../../../state/environment/Environment";
import LeafDimensions from "../../styling/LeafDimensions";
import { OS } from "../../../state/environment/types/OS";

interface Props {
    leafInterface: LeafInterface;
}

const DrawerNavigator: React.FC<Props> = ({ leafInterface }) => {
    const [drawerContracted, setDrawerContracted] = useState(false);
    const [sidebar, setSidebar] = useState<JSX.Element | undefined>(undefined);
    const [screens, setScreens] = useState<LeafScreen[]>([]);

    const Stack = createStackNavigator();
    const Insets = useSafeAreaInsets();
    const PlatformIsWeb = Environment.instance.getOS() == OS.web;

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

    const toggleDrawer = () => {
        setDrawerContracted(!drawerContracted);
    };

    // TODO: Clean this entire file up, it's a messr

    return (
        <HStack
            style={{
                flex: 1,
            }}
        >
            {drawerContracted ? undefined : (
                <VStack
                    style={{
                        height: "100%",
                        width: 250,
                        borderRightWidth: 0.5,
                        borderRightColor: "gray",
                        paddingHorizontal: 16,
                        paddingTop: Insets.top, // Hiding/showing a safe area causes flickering
                    }}
                >
                    <HStack
                        spacing={12}
                        style={{ width: "100%", alignItems: "center", paddingTop: 12, paddingBottom: 16 }}
                    >
                        <LeafIconButton
                            icon="book-open-outline"
                            onlyIcon={true}
                            iconColor={LeafColors.textDark}
                            size={40}
                            color={LeafColors.textDark}
                            onPress={toggleDrawer}
                            style={{
                                paddingLeft: LeafDimensions.screenPadding - 16 - 6,
                            }}
                        />

                        <LeafText typography={LeafTypography.header.withSize(24)} wide={false} style={{}}>
                            {strings("appName")}
                        </LeafText>
                    </HStack>

                    {leafInterface.roots.map((root, index) => {
                        return <DrawerItem leafStackRoot={root} key={root.id.toString()} />;
                    })}
                </VStack>
            )}

            {sidebar == undefined ? undefined : (
                <VStack
                    style={{
                        height: "100%",
                        width: 350,
                        borderRightWidth: 0.5,
                        borderRightColor: "gray",
                        paddingTop: Insets.top, // Hiding/showing a safe area causes flickering
                    }}
                >
                    <VStack style={{ flex: 1, width: "100%" }}>
                        <HStack
                            spacing={12}
                            style={{
                                alignItems: "center",
                                width: "100%",
                                paddingTop: 12,
                                paddingLeft: LeafDimensions.screenPadding,
                            }}
                        >
                            {!drawerContracted ? undefined : (
                                <LeafIconButton
                                    icon="book-open-outline"
                                    onlyIcon={true}
                                    iconColor={LeafColors.textDark}
                                    size={40}
                                    color={LeafColors.textDark}
                                    onPress={toggleDrawer}
                                    style={{
                                        marginLeft: -6, // To account for icon box
                                    }}
                                />
                            )}

                            <LeafText
                                typography={LeafTypography.header.withSize(24)}
                                wide={false}
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {NavigationEnvironment.inst.sidebarHeader}
                            </LeafText>
                        </HStack>

                        {sidebar}
                    </VStack>
                </VStack>
            )}

            <View
                style={{
                    flex: 1,
                    paddingTop: 12,
                }}
            >
                <SafeAreaView
                    style={{
                        height: "100%",
                    }}
                >
                    <HStack
                        spacing={12}
                        style={{
                            paddingLeft: LeafDimensions.screenPadding,
                            alignItems: "center",
                        }}
                    >
                        {!(drawerContracted && sidebar == undefined) ? undefined : (
                            <LeafIconButton
                                icon="book-open-outline"
                                onlyIcon={true}
                                iconColor={LeafColors.textDark}
                                size={40}
                                color={LeafColors.textDark}
                                onPress={toggleDrawer}
                                style={{
                                    marginLeft: -6, // To account for icon box
                                }}
                            />
                        )}

                        <LeafText typography={LeafTypography.subscript} wide={false}>
                            {screens
                                .map((screen, index) => {
                                    return screen.title;
                                })
                                .join(" / ")}
                        </LeafText>
                    </HStack>

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
                                            animationEnabled: index > 0 && !PlatformIsWeb,
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
