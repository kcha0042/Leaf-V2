import { createStackNavigator } from "@react-navigation/stack"
import { VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import YourPatientsScreen from "../../../worker/YourPatientsScreen"
import HStack from "../../containers/HStack"
import LeafColors from "../../styles/LeafColors"
import LeafTypography from "../../styles/LeafTypography"
import LeafButton from "../../views/LeafButton/LeafButton"
import { LeafButtonType } from "../../views/LeafButton/LeafButtonType"
import LeafText from "../../views/LeafText/LeafText"
import LeafInterface from "../LeafInterface"
import LeafScreen from "../LeafScreen"
import CustomLeafHeader from "../impl/CustomHeader"
import NavigationEnvironment from "./NavigationEnvironment"
import NavigationStateManager from "./NavigationStateManager"
import { EmptyScreen } from "../EmptyScreen"

interface Props {
    leafInterface: LeafInterface
}

/**
 * Our custom tab bar
 * @param param0 {@link Props}
 * @returns a JSX tab bar
 */
export const TabBarNavigator: React.FC<Props> = ({ leafInterface }) => {
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
};


