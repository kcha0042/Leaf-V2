import React, { useEffect, useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { EmptyScreen, StackWrapper } from "../impl/RenderStack"
import LeafColors from "../../styles/LeafColors"
import Environment from "../../../../state/environment/Environment"
import { LeafScreenOrientation } from "../../../../state/environment/types/LeafScreenOrientation"
import { Dimensions, View } from "react-native"
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import LeafStack from "../LeafStack";
import StateManager from "../../../../state/publishers/StateManager";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LeafText from "../../views/LeafText/LeafText"
import LeafTypography from "../../styles/LeafTypography"
import { LeafFontWeight } from "../../styles/typography/LeafFontWeight"
import { strings } from "../../../../localisation/Strings"
import LeafDimensions from "../../styles/LeafDimensions"
import LeafIcon from "../../views/LeafIcon/LeafIcon"
import { LeafIconSize } from "../../views/LeafIcon/LeafIconSize"
import HStack from "../../containers/HStack"
import { VStack } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import LeafButton from "../../views/LeafButton/LeafButton"
import { LeafButtonType } from "../../views/LeafButton/LeafButtonType"
import { createStackNavigator } from "@react-navigation/stack"
import CustomLeafHeader from "../impl/CustomHeader"
import NavigationStateManager from "./NavigationStateManager"
import NavigationEnvironment from "./NavigationEnvironment"
import YourPatientsScreen from "../../../worker/YourPatientsScreen"
import useForceUpdate from "use-force-update"
import { YourPatientsStack } from "../../../worker/navigation/stacks/YourPatientsStack"
import { PatientsStack } from "../../../worker/navigation/stacks/PatientsStack"
import { NewTriageStack } from "../../../worker/navigation/stacks/NewTriageStack"
import LeafScreen from "../LeafScreen"

interface Props {
    stacks: LeafStack[]
}

/**
 * Our custom tab bar
 * @param param0 {@link Props}
 * @returns a JSX tab bar
 */
export const TabBarNavigator: React.FC<Props> = ({ stacks }) => {
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
        <VStack
            flex={1}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                {
                        screens.length == 0
                            ?
                        <EmptyScreen />
                            :
                        <Stack.Navigator>
                            {
                                screens.map((screen, index) => {
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
                                                        buttonProps={
                                                            {
                                                                canGoBack: index > 0,
                                                                navigation: navigation,
                                                            }
                                                        }
                                                    />
                                            )})}
                                        />
                                    )
                                })
                            }
                        </Stack.Navigator>
                    }
            </View>

            <SafeAreaView 
          edges={['bottom']}
          style={[
         
            { backgroundColor: 'red' },
          ]}
        >
            <HStack>
                <LeafButton 
                    label={"1"}
                    icon="arrow-right-circle"
                    typography={LeafTypography.primaryButton}
                    type={LeafButtonType.filled} 
                    color={LeafColors.accent}
                    wide={false}
                    onPress={() => {
                        NavigationEnvironment.inst.clearScreens();
                        NavigationEnvironment.inst.setSidebarComponent(<YourPatientsScreen />, "Your Patients");
                    }}
                />

                <LeafButton 
                    label={"test"}
                    icon="arrow-right-circle"
                    typography={LeafTypography.primaryButton}
                    type={LeafButtonType.filled} 
                    color={LeafColors.accent}
                    wide={false}
                    onPress={() => {
                        NavigationEnvironment.inst.navigationTo(YourPatientsScreen, undefined, "Second Screen");
                        NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
                    }}
                />

                <LeafButton 
                    label={"3"}
                    icon="arrow-right-circle"
                    typography={LeafTypography.primaryButton}
                    type={LeafButtonType.filled} 
                    color={LeafColors.accent}
                    wide={false}
                    onPress={() => {
                        NavigationEnvironment.inst.navigationTo(YourPatientsScreen, undefined, "Second Screen");
                        NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
                    }}
                />
            </HStack>
            </SafeAreaView>
        </VStack>

    )

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
                    borderRightColor: 'gray',
                    padding: 16,
                }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <LeafText typography={LeafTypography.body}> Hello World </LeafText>

                    <LeafButton 
                        label={"1"}
                        icon="arrow-right-circle"
                        typography={LeafTypography.primaryButton}
                        type={LeafButtonType.filled} 
                        color={LeafColors.accent}
                        onPress={() => {
                            NavigationEnvironment.inst.clearScreens();
                            NavigationEnvironment.inst.setSidebarComponent(<YourPatientsScreen />, "Your Patients");
                        }}
                    />

                    <LeafButton 
                        label={"test"}
                        icon="arrow-right-circle"
                        typography={LeafTypography.primaryButton}
                        type={LeafButtonType.filled} 
                        color={LeafColors.accent}
                        onPress={() => {
                            NavigationEnvironment.inst.navigationTo(YourPatientsScreen, undefined, "Second Screen");
                            NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
                        }}
                    />

                    <LeafButton 
                        label={"3"}
                        icon="arrow-right-circle"
                        typography={LeafTypography.primaryButton}
                        type={LeafButtonType.filled} 
                        color={LeafColors.accent}
                        onPress={() => {
                            NavigationEnvironment.inst.navigationTo(YourPatientsScreen, undefined, "Second Screen");
                            NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
                        }}
                    />

                </SafeAreaView>
            </VStack>

            {
                sidebar == undefined ? undefined : 
                (
                    <VStack
                        style={{
                            height: "100%",
                            width: "25%",
                            borderRightWidth: 0.5,
                            borderRightColor: 'gray',
                        }}
                    >
                        <SafeAreaView style={{ flex: 1 }}>
                            {
                                sidebar == undefined 
                                    ? 
                                undefined 
                                    : 
                                <VStack flex={1}>
                                    <LeafText
                                        typography={LeafTypography.body}
                                    >
                                        {NavigationEnvironment.inst.sidebarHeader}
                                    </LeafText>

                                    {sidebar}
                                </VStack>
                                
                            }
                        </SafeAreaView>
                    </VStack>
                )
            }

            <View
                style={{
                    height: "100%",
                    width: sidebar == undefined ? "80%" : "55%",
                }}
            >
                {
                        screens.length == 0
                            ?
                        <EmptyScreen />
                            :
                        <Stack.Navigator>
                            {
                                screens.map((screen, index) => {
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
                                                        buttonProps={
                                                            {
                                                                canGoBack: index > 0,
                                                                navigation: navigation,
                                                            }
                                                        }
                                                    />
                                            )})}
                                        />
                                    )
                                })
                            }
                        </Stack.Navigator>
                    }
            </View>
        </HStack>
    );
};


