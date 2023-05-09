import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Environment from "../../../state/environment/Environment";
import { ScreenType } from "../../../state/environment/types/ScreenType";
import { DrawerNavigator } from "./DrawerNavigator";
import { TabBarNavigator } from "./TabBarNavigator";
import { LeafAppUserInterfaces } from "./Types";

export const AppNavigator: React.FC = () => {
    // TODO: check which account is logged in, use the corresponding UI to load the pafe
    const deviceIsTablet = Environment.instance.getScreenType() == ScreenType.large;

    return (
        <NavigationContainer>
            {
                deviceIsTablet ? <DrawerNavigator stacks={LeafAppUserInterfaces.nurse.stacks}/> : <TabBarNavigator stacks={LeafAppUserInterfaces.nurse.stacks}/>
            }
        </NavigationContainer>
    ) 
}