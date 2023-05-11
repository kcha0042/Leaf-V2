import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "native-base";
import Patient from "../../../model/patient/Patient";
import PatientCard from "../../worker/components/PatientCard";
import { dummyPatients } from "./DemoPatients";

//* For showcasing sidebar
export const SidebarItemWrapper = (patient: Patient): React.FC => {
    const SideBar: React.FC = () => {
        return (
            <View key={`${patient.mrn} view`} style={{padding: 10}}>
                <PatientCard key={`${patient.mrn} card`}  patient={patient} onPress={() => null}/>
            </View>
        )
    }

    return SideBar;
}
    
    
export const SideBarScreen: React.FC = () => {

    return (
        <ScrollView>
        {
            dummyPatients.map(patient => SidebarItemWrapper(patient))
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