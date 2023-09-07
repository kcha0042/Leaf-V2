import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { strings } from "../../localisation/Strings";
import Patient from "../../model/patient/Patient";
import Session from "../../model/session/Session";
import Environment from "../../state/environment/Environment";
import { OS } from "../../state/environment/types/OS";
import StateManager from "../../state/publishers/StateManager";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafCheckboxStatic from "../base/LeafCheckbox/LeafCheckboxStatic";
import LeafText from "../base/LeafText/LeafText";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import ExportPatientCard from "../custom/ExportPatientCard";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { exportPatient } from "../../utils/ExportPatientUtil";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

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

    const checkboxPressHandler = () => {
        setSelectAll(!selectAll);
        toggleSelectAll();
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

                    <TouchableOpacity onPress={checkboxPressHandler}>
                        <HStack spacing={8}>
                            <LeafText
                                typography={LeafTypography.subscript.withWeight(LeafFontWeight.SemiBold)}
                                wide={false}
                            >
                                {selectAll ? strings("operation.deselectAll") : strings("operation.selectAll")}
                            </LeafText>
                            <LeafCheckboxStatic
                                isChecked={!selectAll}
                                initialValue={true}
                                // On mobile devices, the checkbox cannot be recognized within the TouchableOpacity, so it
                                // also needs to call the checkboxPressHandler. However, on the web, it can be recognized within
                                // the TouchableOpacity, so this condition is needed to avoid executing it twice in a single interaction.
                                onPress={Environment.inst.getOS() !== OS.Web ? checkboxPressHandler : undefined}
                                color={LeafColors.textSemiDark}
                                style={{
                                    marginRight: 8,
                                }}
                            />
                        </HStack>
                    </TouchableOpacity>
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
