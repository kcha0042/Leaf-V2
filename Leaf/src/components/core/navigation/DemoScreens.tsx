import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, VStack } from "native-base";
import LeafButton from "../views/LeafButton/LeafButton";
import { LeafButtonType } from "../views/LeafButton/LeafButtonType";
import { DemoNavigationNavigationProp } from "./NurseAccountUI";
import LeafTypography from "../styles/LeafTypography";
import LeafColors from "../styles/LeafColors";

//! These are placeholders until we develop the pages
export const YourPatients = () => {
    return (
        <View style={styles.container}>
            <Text> Your Patients </Text>
        </View>
    )
}

//* For showcasing sidebar


interface DemoNavigationProps {
    navigation: DemoNavigationNavigationProp    
}

export const DemoNavigation: React.FC<DemoNavigationProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text> Demo Navigation </Text> 
            <LeafButton label={"Navigate"} type={LeafButtonType.filled} onPress={() => navigation.navigate('Scrollable Screen')} typography={LeafTypography.primaryButton} color={LeafColors.accent}></LeafButton>
        </View>
    )
}

const tmpArray = [...Array(100).keys()]
export const ScrollableScreen = () => {
    return (
        <ScrollView>
            {
                tmpArray.map(x => {
                    return (
                        <View key={`Wrapper ${x}`} style={styles.container}>
                            <Text style={styles.text} key={x}> {x} </Text>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export const NewTriage = () => {
    return (
        <View style={styles.container}>
            <Text> New Triage </Text> 
        </View>
    )
}

export const Patients = () => {
    return (
        <View style={styles.container}>
            <Text> Patients </Text> 
        </View>
    )
}

export const YourAccount = () => {
    return (
        <View style={styles.container}>
            <Text> Your Account  </Text> 
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})