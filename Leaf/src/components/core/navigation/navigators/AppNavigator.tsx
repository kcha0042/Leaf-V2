import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Environment from "../../../../state/environment/Environment";
import { ScreenType } from "../../../../state/environment/types/ScreenType";
import { DrawerNavigator } from "./DrawerNavigator";
import { TabBarNavigator } from "./TabBarNavigator";
import LeafInterface from "../LeafAccountUI";

interface Props {
    leafInterface: LeafInterface
}

export const InterfaceNavigator: React.FC<Props> = ({ leafInterface }) => {
    const deviceIsTablet = Environment.instance.getScreenType() == ScreenType.large;

    return (
        <NavigationContainer>
            {
                deviceIsTablet 
                    ? 
                <DrawerNavigator stacks={leafInterface.stacks}/> 
                    :
                <TabBarNavigator stacks={leafInterface.stacks}/>
            }
        </NavigationContainer>
    ) 
}