import React from "react";
import { TabBarNavigator } from "./TabBarNavigator";
import { LeafAppUserInterfaces } from "./Types";

export const AppNavigator: React.FC = () => {
    // if (Environment.instance.getScreenType() == ScreenType.large){
    //     // TODO
    //     return <DrawerNavigator stacks={stacks} />
    // }
    // return <TabBarNavigator/>

    // TODO: check which account is logged in, use the corresponding UI to load the pafe

    return <TabBarNavigator stacks={LeafAppUserInterfaces.nurse.stacks}/>
}