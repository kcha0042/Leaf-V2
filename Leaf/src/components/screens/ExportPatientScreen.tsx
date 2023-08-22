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
import { strings } from "../../localisation/Strings";
import { shareAsync } from "expo-sharing";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const exportPatient = async (patient: Patient) => {
    // Generate file
    const csvHeader = strings("csv.header");
    const csvData = `${patient.mrn},${patient.dob},${patient.firstName},${patient.lastName},${patient.sex},${patient.phoneNumber},${patient.postCode},${patient.timeLastAllocated},${patient.idAllocatedTo},${patient.events}`;
    const filename = `${patient.fullName + Date.now()}.csv`; // Use date avoid conflicts with exsiting file name.
    const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permission.granted) {
        await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri, filename, "csv")
            .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, csvHeader + csvData, {
                    encoding: FileSystem.EncodingType.UTF8,
                });
            })
            .catch((e) => console.log(e));
    } else {
        console.log("Permission denied");
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
