import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Environment from "../../../state/environment/Environment";
import { TabBarNavigator } from "./TabBarNavigator";
import LeafInterface from "../LeafInterface";
import DrawerNavigator from "./DrawerNavigator";
import StateManager from "../../../state/publishers/StateManager";
import { LeafNavigator } from "../../../state/environment/types/LeafNavigator";

interface Props {
    leafInterface: LeafInterface;
}

export const InterfaceNavigator: React.FC<Props> = ({ leafInterface }) => {
    const [isWideScreen, setIsWideScreen] = useState<boolean>(Environment.inst.getNavigatorFromScreenWidth() == LeafNavigator.drawerNavigator);

    useEffect(() => {
        const unsubscribe = StateManager.contentWidth.subscribe(() => {
            setIsWideScreen(Environment.inst.getNavigatorFromScreenWidth() == LeafNavigator.drawerNavigator);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <NavigationContainer>
            {isWideScreen ? (
                <DrawerNavigator leafInterface={leafInterface} />
            ) : (
                <TabBarNavigator leafInterface={leafInterface} />
            )}
        </NavigationContainer>
    );
};
