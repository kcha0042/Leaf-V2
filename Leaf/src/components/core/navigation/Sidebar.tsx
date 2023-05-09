import { VStack } from "native-base";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeafTypography from "../styles/LeafTypography";
import LeafText from "../views/LeafText/LeafText";
import { LeafSideBarItem } from "./Types";

interface Props {
    items: LeafSideBarItem[]
    title: string
}

export const Sidebar: React.FC<Props> = ({ items, title }) => {
    return (
        <VStack>
            <LeafText typography={LeafTypography.header}> 
                { title }
            </LeafText>

            {
                items.map(item => {
                    return (
                        <TouchableOpacity
                            onPress={item.passProps}
                        >
                            <item.component />
                        </TouchableOpacity>
                    )
                })
            }
        </VStack>
    )
}