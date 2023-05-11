import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StateManager from "../../../state/publishers/StateManager";
import LeafTypography from "../styles/LeafTypography";
import LeafText from "../views/LeafText/LeafText";
import { LeafSideBarItem } from "./Types";

interface Props {
    items: LeafSideBarItem[]
    title: string
}

export const Sidebar: React.FC<Props> = ({ items, title }) => {

    useEffect(() => {
        StateManager.drawerShowStack.publish(false);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <LeafText typography={LeafTypography.header} style={{ padding: 10 }}> 
                    { title }
                </LeafText>

                {
                    items.map(item => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    item.passProps();
                                    StateManager.drawerShowStack.publish(true);
                                }}
                            >
                                <item.component />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRightWidth: 1,
        backgroundColor: 'white',   // TODO: use same colour as drawer
        borderColor: '#ccc'
    }
})