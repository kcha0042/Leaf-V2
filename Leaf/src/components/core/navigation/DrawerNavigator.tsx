import React, { useState } from "react"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { LeafStack } from "./Types"
import { StackWrapper } from "./RenderStack"
import LeafColors from "../styles/LeafColors"
import Environment from "../../../state/environment/Environment"
import { LeafScreenOrientation } from "../../../state/environment/types/LeafScreenOrientation"
import { Dimensions } from "react-native"

interface Props {
    stacks: LeafStack[]
}

const Drawer = createDrawerNavigator()

export const DrawerNavigator: React.FC<Props> = ({ stacks }) => {

    const getDrawerType = (): "front" | "slide" | "back" | "permanent" => {
        return Environment.instance.getScreenOrientation() == LeafScreenOrientation.Landscape ? "permanent" : "slide";
    }

    const [ drawerType, setDrawerType ] = useState(getDrawerType());

    Dimensions.addEventListener('change', () => {
        setDrawerType(getDrawerType)
    })

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: drawerType,
                drawerStyle: {
                    backgroundColor: LeafColors.screenBackgroundLight.getColor()
                }
            }}
        >
            {
                stacks.map(stack => <Drawer.Screen name={stack.stackName} component={StackWrapper(stack)}/>)
            }
        </Drawer.Navigator>
    )
}