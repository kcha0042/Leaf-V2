import React, { useEffect, useState } from "react";
import VGap from "../containers/layout/VGap";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
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
import LeafTypography from "../styling/LeafTypography";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafColors from "../styling/LeafColors";
import { strings } from "../../localisation/Strings";
import LeafText from "../base/LeafText/LeafText";
import LeafCheckbox from "../base/LeafCheckbox/LeafCheckboxCustom";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const exportPatient = async (selectedPatients: Patient[]) => {
    if (selectedPatients.length == 0) {
        return;
    }
    const date = new Date();
    const dateString = date.toLocaleString();
    // Define a regular expression to match white spaces, commas, colons, and slashes.
    const regex = /[,\s:\/]/g;
    // Replace white spaces, commas, colons, and slashes with underscores.
    const sanitizedDatestring = dateString.replace(regex, "_");

    // Generate file.
    const filename = `${sanitizedDatestring}.csv`; // Assuming the file name is the date time
    var csvData = "MRN,DOB,FirstName,LastName,Gender,PhoneNumber,PostCode,TimeLastAllocated,AllocatedTo,Events\n";
    for (const patient of selectedPatients) {
        csvData += ` ${patient.mrn},${patient.dob},${patient.firstName},${patient.lastName},${patient.sex},${patient.phoneNumber},${patient.postCode},${patient.timeLastAllocated},${patient.idAllocatedTo},${patient.events}\n`;
    }
    console.log(csvData);

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
        // Define a regular expression to match white spaces, commas, colons, and slashes
        const regex = /[,\s:\/]/g;
        // Replace white spaces, commas, colons, and slashes with underscores
        const sanitizedFileName = filename.replace(regex, "_");
        const filePath = FileSystem.documentDirectory + sanitizedFileName;

        try {
            await FileSystem.writeAsStringAsync(filePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });
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
    const [selectedPatients, updateSelectedPatients] = React.useState<Patient[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [notify, setNotify] = useState(false);

    const notifyHandler = () => {
        if (selectedPatients.length == 0) {
            setNotify(true);
        }
    };

    const togglePatientSelect = (patient: Patient) => {
        setNotify(false);
        const updatedSelectedPatients = [...selectedPatients];
        const index = updatedSelectedPatients.findIndex((p) => p.mrn.matches(patient.mrn));
        if (index !== -1) {
            updatedSelectedPatients.splice(index, 1);
        } else {
            updatedSelectedPatients.push(patient);
        }
        updateSelectedPatients(updatedSelectedPatients);

        // Change the select all status when all the cards are manually selected.
        if (updatedSelectedPatients.length == patients.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    };

    const toggleSelectAll = () => {
        setNotify(false);
        // Update the selectedPatient list.
        if (selectAll) {
            updateSelectedPatients([]);
        } else {
            updateSelectedPatients(patients);
        }
        setSelectAll(!selectAll);
    };

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
        togglePatientSelect(patient);
    };

    return (
        <DefaultScreenContainer>
            <VStack spacing={16}>
                <LeafButton
                    label="Export"
                    icon="file-export"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    onPress={async () => {
                        notifyHandler();
                        await exportPatient(selectedPatients);
                    }}
                />
                <HStack
                    spacing={16}
                    style={{
                        alignItems: "center",
                    }}
                >
                    <LeafText
                        typography={LeafTypography.body.withColor(LeafColors.textSemiDark)}
                        style={{
                            flex: 1,
                            color: notify ? LeafColors.textError.getColor() : LeafColors.accent.getColor(),
                        }}
                    >
                        {selectedPatients.length === 0
                            ? strings("label.noPatientSelected")
                            : selectedPatients.length + "/" + patients.length + " " + strings("label.patientSelected")}
                    </LeafText>
                    <LeafText typography={LeafTypography.subscript.withWeight(LeafFontWeight.SemiBold)} wide={false}>
                        {selectAll ? strings("operation.deselectAll") : strings("operation.selectAll")}
                    </LeafText>
                    <LeafCheckbox
                        isChecked={!selectAll}
                        initialValue={true}
                        onValueChange={(isTicked) => {
                            setSelectAll(isTicked);
                            toggleSelectAll();
                        }}
                        color={LeafColors.textSemiDark}
                        style={{
                            marginRight: 8,
                        }}
                    />
                </HStack>
            </VStack>

            <VGap size={12} />

            <VStack>
                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => (
                        <ExportPatientCard
                            patient={patient}
                            isSelected={selectedPatients.some((p) => p.mrn.matches(patient.mrn))}
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
