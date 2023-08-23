import React, { useEffect } from "react";
import VGap from "../containers/layout/VGap";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VStack from "../containers/VStack";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import Session from "../../model/session/Session";
import Patient from "../../model/patient/Patient";
import StateManager from "../../state/publishers/StateManager";
import { FlatList, ScrollView, View } from "react-native";
import LeafDimensions from "../styling/LeafDimensions";
import ExportPatientCard from "../custom/ExportPatientCard";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const exportPatient = async (patient: Patient) => {
    const date = new Date();
    const dateString = date.toLocaleString();
    // Generate file.
    const csvData = `MRN,DOB,FirstName,LastName,Gender,PhoneNumber,PostCode,TimeLastAllocated,AllocatedTo,Events\n ${patient.mrn},${patient.dob},${patient.firstName},${patient.lastName},${patient.sex},${patient.phoneNumber},${patient.postCode},${patient.timeLastAllocated},${patient.idAllocatedTo},${patient.events}`;
    const filename = `${patient.firstName}_${patient.lastName}_${patient.mrn}_${dateString}.csv`; // Use date avoid conflicts with exsiting file name.

    if (Environment.inst.getOS() == OS.Android) {
        const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(); // Getting permission for android.
        if (permission.granted) {
            await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri, filename, "csv")
                .then(async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, csvData, {
                        encoding: FileSystem.EncodingType.UTF8,
                    });
                })
                .catch((e) => console.log(e));
        } else {
            console.log("Permission denied");
        }
    } else if (Environment.inst.getOS() == OS.IOS) {
        const filePath = FileSystem.documentDirectory + filename;
        try {
            await FileSystem.writeAsStringAsync(filePath, csvData);
            await shareAsync(filePath);
        } catch (e) {
            console.log(e);
        }
    } else if (Environment.inst.getOS() == OS.Web) {
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }
};

const ExportPatientScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());

    useEffect(() => {
        const unsubscribe = StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();

        return () => {
            unsubscribe();
        };
    }, []);

    const onPressPatient = (patient: Patient) => {
        Session.inst.setActivePatient(patient);
        exportPatient(patient);
    };

    return (
        <DefaultScreenContainer>
            <VStack>
                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => (
                        <ExportPatientCard
                            patient={patient}
                            onPress={() => {
                                onPressPatient(patient);
                            }}
                        />
                    )}
                    keyExtractor={(patient) => patient.mrn.toString()}
                    ItemSeparatorComponent={() => <VGap size={LeafDimensions.cardSpacing} />}
                    scrollEnabled={false}
                    style={{
                        width: "100%",
                        overflow: "visible", // Stop shadows getting clipped
                        flexGrow: 0, // Ensures the frame wraps only the FlatList content
                    }}
                />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default ExportPatientScreen;
