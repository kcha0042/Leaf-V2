import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackWrapper } from "../impl/RenderStack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LeafStack from "../LeafStack";

interface Props {
    stacks: LeafStack[]
}

const Tab = createMaterialBottomTabNavigator();

/**
 * Our custom tab bar
 * @param param0 {@link Props}
 * @returns a JSX tab bar
 */
export const TabBarNavigator: React.FC<Props> = ({ stacks }) => {
    return (
        <Tab.Navigator
            // activeColor={LeafColors.accent.getColor()}
            // inactiveColor={LeafColors.mediumAccent.getColor()}
            barStyle={{ 
                // backgroundColor: LeafColors.lightAccent.getColor(),
                height: 100,
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    const stack = stacks.find((s) => s.stackName === route.name);
                    if (!stack) return null;

                    const iconName = focused ? stack.focusedIcon : stack.icon;
                    return <Icon name={iconName} size={26} color={color} />;
                },
            })}
        >
            {
                stacks.map((stack) => {
                    const StackComponent = StackWrapper(stack);
                    return <Tab.Screen key={stack.stackName} name={stack.stackName} component={StackComponent} />;
                })
            }
        </Tab.Navigator>
    );
};


