import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Environment from "../../../state/environment/Environment";
import { ScreenType } from "../../../state/environment/types/ScreenType";
import { TabBarNavigator } from "./TabBarNavigator";
import LeafInterface from "../LeafInterface";
import DrawerNavigator from "./DrawerNavigator";
import StateManager from "../../../state/publishers/StateManager";

interface Props {
    leafInterface: LeafInterface;
}

export const InterfaceNavigator: React.FC<Props> = ({ leafInterface }) => {
    const [deviceIsTablet, setDeviceIsTablet] = useState<boolean>(Environment.inst.getScreenType() == ScreenType.Large);

    useEffect(() => {
        StateManager.contentWidth.subscribe(() => {
            setDeviceIsTablet(Environment.inst.getScreenType() == ScreenType.Large);
        });
    }, []);

    return (
        <NavigationContainer>
            {deviceIsTablet ? (
                <DrawerNavigator leafInterface={leafInterface} />
            ) : (
                <TabBarNavigator leafInterface={leafInterface} />
            )}
        </NavigationContainer>
    );
};
