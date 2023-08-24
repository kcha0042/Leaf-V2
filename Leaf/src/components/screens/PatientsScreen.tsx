import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Patient from "../../model/patient/Patient";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import LeafTextButton from "../base/LeafTextButton/LeafTextButton";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import PatientCard from "../custom/PatientCard";
import PatientsPicker from "../custom/PatientsPicker";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import PatientPreviewScreen from "./PatientPreviewScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import LeafText from "../base/LeafText/LeafText";
import VGap from "../containers/layout/VGap";
import { FlatList } from "react-native-gesture-handler";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = React.useState<Patient[]>(Session.inst.getAllPatients());
    const [timeIcon, setTimeIcon] = useState<"chevron-down" | "chevron-up">("chevron-down");
    const [codeIcon, setCodeIcon] = useState<"chevron-down" | "chevron-up">("chevron-down");

    useEffect(() => {
        const unsubscribe = StateManager.patientsFetched.subscribe(() => {
            setPatients(Session.inst.getAllPatients());
        });

        Session.inst.fetchAllPatients();

        return () => {
            unsubscribe();
        };
    }, []);

    const onSelection = () => {};

    const onSearch = () => {};

    const onTime = () => {
        timeIcon == "chevron-down" ? setTimeIcon("chevron-up") : setTimeIcon("chevron-down");
    };

    const onCode = () => {
        codeIcon == "chevron-down" ? setCodeIcon("chevron-up") : setCodeIcon("chevron-down");
    };

    const onPatientPress = (patient: Patient) => {
        Session.inst.setActivePatient(patient);
        NavigationSession.inst.navigateTo(PatientPreviewScreen, navigation, patient.fullName);
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                    backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                }}
            >
                <PatientsPicker onSelection={onSelection} />

                {/* <LeafSearchBar searchQuery={""} onSearch={onSearch} /> */}

                <HStack
                    style={{
                        width: "100%",
                        borderBottomWidth: 2,
                        borderBottomColor: LeafColors.fillBackgroundLight.getColor(),
                        paddingBottom: 6,
                    }}
                >
                    <LeafTextButton
                        label={"Time"}
                        typography={LeafTypography.plainTextButton}
                        onPress={onTime}
                        icon={timeIcon}
                        iconColor={LeafColors.textDark}
                        style={{ flex: 1 }}
                        textStyle={{ paddingLeft: 6 }}
                    />

                    <LeafTextButton
                        label={"Code"}
                        typography={LeafTypography.plainTextButton}
                        onPress={onCode}
                        icon={codeIcon}
                        iconColor={LeafColors.textDark}
                        style={{ flex: 1 }}
                        textStyle={{ paddingLeft: 6 }}
                    />
                </HStack>

                <VGap size={6} />

                <FlatList
                    data={patients}
                    renderItem={({ item: patient }) => (
                        <PatientCard patient={patient} onPress={() => onPatientPress(patient)} />
                    )}
                    keyExtractor={(patient: Patient) => patient.mrn.toString()}
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

export default PatientsScreen;
