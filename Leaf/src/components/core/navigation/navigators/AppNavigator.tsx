import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Environment from "../../../../state/environment/Environment";
import { ScreenType } from "../../../../state/environment/types/ScreenType";
import { TabBarNavigator } from "./TabBarNavigator";
import LeafInterface from "../LeafInterface";
import DrawerNavigator from "./DrawerNavigator";

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
                <DrawerNavigator leafInterface={leafInterface}/> 
                    :
                <TabBarNavigator leafInterface={leafInterface}/>
            }
        </NavigationContainer>
    ) 
}