import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { LeafScreen, LeafSideBarItem, LeafStack } from "./Types";
import CustomLeafHeader from "./CustomHeader";
import { Sidebar } from "./Sidebar";
import { View, StyleSheet } from "react-native";
import Environment from "../../../../state/environment/Environment";
import { ScreenType } from "../../../../state/environment/types/ScreenType";
import LeafText from "../../views/LeafText/LeafText";
import LeafTypography from "../../styles/LeafTypography";
import StateManager from "../../../../state/publishers/StateManager";
import { useFocusEffect } from "@react-navigation/native";
import LeafStack from "../LeafStack";

/**
 * Render a react native native stack with the screens you include in the leafstack
 * @param leafStack the stack you want to render
 * @returns a React Native Native Stack
 */
function renderNativeStack(leafStack: LeafStack, hasSidebar: boolean) {
    
    const Stack = createStackNavigator();

    // these options must apply to all screens in our application
    const globalOptions = {

    }

    return (
        <Stack.Navigator>
            {
                leafStack.screens.map((screen, index) => {
                    if (!hasSidebar || index >= 1){
                        return (
                            <Stack.Screen 
                                // Yes, key/name are both id
                                key={screen.id}
                                name={screen.id}
                                component={screen.component}
                                options={({ navigation }) => ({
                                    ...screen.options,
                                    ...globalOptions,
                                    header: () => (
                                        <CustomLeafHeader
                                            title={screen.title}
                                            buttonProps={
                                                {
                                                    canGoBack: !hasSidebar ? index > 0 : index > 1, // we only want to allow the user to go back if it's the first screen in the stack
                                                    navigation: navigation,
                                                }
                                            }
                                        />
                                )})}
                            />
                        )
                    }
                })
            }
        </Stack.Navigator>
    )
}

/**
 * This wrapper takes our stack object and returns a react component that does not take in any props, then uses the leafStack object to render a native stack
 * This is required as the navigation components (tabbar, drawer, etc) require components, not already rendered JSX elements
 * In the wrapper we also check, if we have a sidebar, if we need to render the stack or empty screen next to the sidebar
 * @param leafStack the stack to you want to convert to a component
 * @returns A react stack component
 */
export const StackWrapper = (leafStack: LeafStack): React.FC => {
    
    const NativeStack: React.FC = () => {

        useFocusEffect(
            React.useCallback(() => {
                // Reset showStack when this screen is focused
                setShowStack(false);
            }, [])
        );

        const [showStack, setShowStack] = useState(false);
        const hasSidebar = leafStack.sideBarItemList.length >= 1 && Environment.instance.getScreenType() == ScreenType.large;

        StateManager.drawerShowStack.subscribe(() => {
            setShowStack(StateManager.drawerShowStack.read())
        })

        if (hasSidebar){
            return(
                <View style={styles.container}>
                    <View style={styles.sidebarWrapper}>
                        <Sidebar items={leafStack.sideBarItemList} title={leafStack.screens[0].title} searchable={leafStack.sideBarSearchable}/>
                    </View>

                    <View style={styles.stackWrapper}>
                        {showStack ? renderNativeStack(leafStack, hasSidebar) : <EmptyScreen/>}
                    </View>
                </View>
            )
        }

        return renderNativeStack(leafStack, hasSidebar);
    };
    
    return NativeStack;
}

const EmptyScreen: React.FC = () => {
    return (
        <View style={styles.emptyScreen}>
            <LeafText wide={false} typography={LeafTypography.body}> No item selected </LeafText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    emptyScreen: {
        flex: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    sidebarWrapper: {
        flex: 3,
    },
    stackWrapper: {
        flex: 5
    }
})