import React from "react"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { LeafStack } from "./Types"
import { StackWrapper } from "./RenderStack"
import LeafColors from "../styles/LeafColors"

interface Props {
    stacks: LeafStack[]
}

const Drawer = createDrawerNavigator()

export const DrawerNavigator: React.FC<Props> = ({ stacks }) => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: "permanent",
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