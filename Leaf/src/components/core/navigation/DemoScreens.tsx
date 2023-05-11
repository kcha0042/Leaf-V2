import React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "native-base";
import Patient from "../../../model/patient/Patient";
import PatientCard from "../../worker/components/PatientCard";
import { dummyPatients } from "./DemoPatients";
import { PatientsNavigationProp } from "./DemoAccountUI";

//* For showcasing sidebar
interface SidebarProps {
    navigation?: PatientsNavigationProp
}

export const SidebarItemWrapper = (patient: Patient, navigation?: PatientsNavigationProp): React.FC => {
    const SideBarItem: React.FC<SidebarProps> = () => {
        return (
            <View key={`${patient.mrn} view`} style={{padding: 10}}>
                <PatientCard key={`${patient.mrn} card`}  patient={patient} onPress={() => navigation.navigate('Patient')}/>
            </View>
        )
    }

    return SideBarItem;
}
    
    
export const SideBarScreen: React.FC<SidebarProps> = ({ navigation }) => {

    return (
        <ScrollView>
        {
            dummyPatients.map(patient => SidebarItemWrapper(patient, navigation)({}))
        }
        </ScrollView>
    )
}

export const YourPatients = () => {
    return (
        <View style={styles.container}>
            <Text> Your Patient </Text>
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