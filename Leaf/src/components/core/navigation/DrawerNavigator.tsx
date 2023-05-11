import React, { useEffect, useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { LeafStack } from "./Types"
import { StackWrapper } from "./RenderStack"
import LeafColors from "../styles/LeafColors"
import Environment from "../../../state/environment/Environment"
import { LeafScreenOrientation } from "../../../state/environment/types/LeafScreenOrientation"
import { Dimensions } from "react-native"
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

interface Props {
    stacks: LeafStack[]
}

const Drawer = createDrawerNavigator()

export const DrawerNavigator: React.FC<Props> = ({ stacks }) => {

    const getDrawerType = (): 'front' | 'slide' | 'back' | 'permanent' => {
        return Environment.instance.getScreenOrientation() == LeafScreenOrientation.Landscape ? 'permanent' : 'front';
    }
    const [ drawerType, setDrawerType ] = useState(getDrawerType());
    const navigation = useNavigation();

    // We only want to add the listener once, when the drawer is mounted
    useEffect(() => {
        const handleDimensionChange = () => {
            const newDrawerType = getDrawerType();
            setDrawerType(newDrawerType);

            if (newDrawerType !== 'permanent') {
                navigation.dispatch(DrawerActions.openDrawer());
            }
        };

        Dimensions.addEventListener('change', handleDimensionChange)
    }, [])

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