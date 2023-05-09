import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, VStack } from "native-base";
import LeafButton from "../views/LeafButton/LeafButton";
import { LeafButtonType } from "../views/LeafButton/LeafButtonType";
import { DemoSidebarNavigationProp } from "./NurseAccountUI";
import LeafTypography from "../styles/LeafTypography";
import LeafColors from "../styles/LeafColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeafText from "../views/LeafText/LeafText";
import LeafFlatCard from "../containers/LeafFlatContainer/LeafFlatContainer";

//! These are placeholders until we develop the pages

//* For showcasing sidebar
interface SideBarItemProps {
    number: number,
    navigation: DemoSidebarNavigationProp
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ number, navigation }) => {
    return (
        <View style={{padding: 10}}>
            <LeafFlatCard color={LeafColors.lightAccent} onPress={() => navigation.navigate("Demo Navigation Screen")} style={styles.sideBarItem}>
                <LeafText typography={LeafTypography.cardTitle}>
                        {`Item number ${number}`}
                </LeafText>
            </LeafFlatCard>
        </View>
    )
}

export const SidebarItemWrapper = (number: number): React.FC => {
    const SideBar: React.FC = () => {
        return (
                <SideBarItem number={number} navigation={null}/>
        )
    }

    return SideBar;
}
    
    
interface SideBarScreenProps {
    navigation: DemoSidebarNavigationProp
}
    
export const SideBarScreen: React.FC<SideBarScreenProps> = ({ navigation }) => {
    
    const tmpArray = [...Array(10).keys()]
    
    return (
        <ScrollView>
        {
            tmpArray.map(num => <SideBarItem key={num} number={num} navigation={navigation}/>)
        }
        </ScrollView>
    )
}

interface DemoNavigationProps {
    navigation: DemoSidebarNavigationProp    
}

export const DemoNavigation: React.FC<DemoNavigationProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text> Demo Navigation </Text> 
            <LeafButton style={styles.button} label={"Navigate"} type={LeafButtonType.filled} onPress={() => navigation.navigate('Scrollable Screen')} typography={LeafTypography.primaryButton} color={LeafColors.accent}></LeafButton>
        </View>
    )
}

export const ScrollableScreen = () => {
    
    const tmpArray = [...Array(100).keys()]
    
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

export const YourPatients = () => {
    return (
        <View style={styles.container}>
            <Text> Your Patients </Text>
        </View>
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
    sideBarItem: {
        borderRadius: 10,
        alignItems: 'center',
        padding: 50
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        width: 300
    }
})