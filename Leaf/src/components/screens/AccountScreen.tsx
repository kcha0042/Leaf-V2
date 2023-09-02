import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import { HospitalsArray } from "../../preset_data/Hospitals";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafPopUp } from "../base/LeafPopUp/LeafPopUp";
import LeafText from "../base/LeafText/LeafText";
import LeafTextButton from "../base/LeafTextButton/LeafTextButton";
import LeafTextInputShort from "../base/LeafTextInputShort/LeafTextInputShort";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import Employee from "../../model/employee/Employee";
import EmployeeManager from "../../model/session/EmployeeManager";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {

    const [employee, setEmployee] = React.useState<Employee | null>(Session.inst.loggedInAccount);
    const [fName, setFName] = React.useState<string>(employee?.firstName || strings("label.loading"));
    const [lName, setLName] = React.useState<string>(employee?.lastName || strings("label.loading"));
    const [email, setEmail] = React.useState<string>(employee?.email || strings("label.loading"));
    const [hospital, setHospital] = React.useState<string>(employee?.currentHospital?.name || strings("label.loading"));

    useEffect(() => {
        const unsubscribe = StateManager.workersFetched.subscribe(() => {
            // If the logged in worker gets updated and hence fetched, we refresh this
            const tmpEmployee = Session.inst.loggedInAccount;
            setEmployee(tmpEmployee);
            setFName(tmpEmployee?.firstName || "");
            setLName(tmpEmployee?.lastName || "");
            setEmail(tmpEmployee?.email || "");
            setHospital(tmpEmployee?.currentHospital?.name || "");
        });

        Session.inst.fetchWorker(Session.inst.loggedInAccount.id);

        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        StateManager.loginStatus.publish(LoginStatus.LoggedOut);
        // TODO: Do we need to change anything in session?
    };

    // Text change
    let newFName = "";
    const onFNameChange = (name: string) => {
        newFName = name;
    };

    let newLName = "";
    const onLNameChange = (name: string) => {
        newLName = name;
    };

    let newEmail = "";
    const onEmailChange = (email: string) => {
        newEmail = email;
    };

    let newHospital = "";
    const onHospitalChange = (hospital: string) => {
        newHospital = hospital;
    };

    const updateEmployee = (employee: Employee | null) => {
        if (employee != null){
            EmployeeManager.inst.updateEmployee(employee);
        }
    }

    // Pop ups
    const [editNameVisible, setEditNameVisible] = useState(false);
    const onNameDone = () => {
        setFName(newFName);
        setLName(newLName);
        setEditNameVisible(false);
        if (employee != null){
            employee.firstName = newFName;
            employee.lastName = newLName;
        }
        updateEmployee(employee);
    };

    const [editEmailVisible, setEditEmailVisible] = useState(false);
    const onEmailDone = () => {
        setEmail(newEmail);
        setEditEmailVisible(false);
        if (employee != null){
            employee.email = newEmail;
        }
        updateEmployee(employee);
    };

    const [errTextVisible, setErrTextVisible] = useState(false);
    const [editHospitalVisible, setEditHospitalVisible] = useState(false);
    const onHospitalDone = () => {
        const hospitals = HospitalsArray;
        // Checking hospital exists
        let hospitalId = null;
        for (let hospital of hospitals) {
            if (hospital.name == newHospital) {
                hospitalId = hospital.id;
                setHospital(newHospital);
                setEditHospitalVisible(false);
                break;
            }
        }

        if (hospitalId != null){
            // TODO: update employee hospital
            updateEmployee(employee);
        }

        setErrTextVisible(hospitalId == null);
    };

    const [enterPasswordVisible, setEnterPasswordVisible] = useState(false);
    const onPasswordDone = () => {
        // TODO: replace with password validation
        const validPassword = true;
        if (validPassword) {
            setEditHospitalVisible(true);
            setEnterPasswordVisible(false);
        }

        setErrTextVisible(!validPassword);
    };

    const onCancel = () => {
        setEditNameVisible(false);
        setEditEmailVisible(false);
        setEditHospitalVisible(false);
        setEnterPasswordVisible(false);
        setErrTextVisible(false);
    };

    const typography = LeafTypography.textButton;
    typography.size = 15;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafDimensions.screenPadding,
                paddingTop: LeafDimensions.screenTopPadding,
            }}
        >
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                {/* Details */}
                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}>{strings("label.details")}</LeafText>

                    <HStack spacing={6} style={{ width: "100%", paddingBottom: 5, alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {fName} {lName}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={strings("button.edit")} typography={typography} onPress={() => setEditNameVisible(true)} />
                    </HStack>

                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {email}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={strings("button.edit")} typography={typography} onPress={() => setEditEmailVisible(true)} />
                    </HStack>
                </FlatContainer>

                {/* Hospital */}
                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}>{strings("label.hospital")}</LeafText>

                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {hospital}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={strings("button.edit")} typography={typography} onPress={() => setEnterPasswordVisible(true)} />
                    </HStack>
                </FlatContainer>

                <Spacer />

                <LeafButton label={strings("button.logout")} onPress={logOut} />
            </VStack>

            {/* Edit name */}
            <LeafPopUp
                visible={editNameVisible}
                setVisible={setEditNameVisible}
                title={strings("label.editName")}
                onDone={onNameDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.givenName")} onTextChange={onFNameChange} />
                <LeafTextInputShort label={strings("inputLabel.surname")} onTextChange={onLNameChange} />
            </LeafPopUp>

            {/* Edit email */}
            <LeafPopUp
                visible={editEmailVisible}
                setVisible={setEditEmailVisible}
                title={strings("label.editEmail")}
                onDone={onEmailDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.email")} onTextChange={onEmailChange} />
            </LeafPopUp>

            {/* Edit hospital */}
            <LeafPopUp
                visible={editHospitalVisible}
                setVisible={setEditHospitalVisible}
                title={strings("label.editHospital")}
                onDone={onHospitalDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("label.hospital")} onTextChange={onHospitalChange} />
                {
                    !errTextVisible ? null : (
                        <LeafText
                            style={{ paddingTop: 10 }}
                            typography={LeafTypography.error}
                        >
                            {strings("error.hospitalExists")}
                        </LeafText>
                    )
                }
            </LeafPopUp>

            {/* Check password */}
            <LeafPopUp
                visible={enterPasswordVisible}
                setVisible={setEnterPasswordVisible}
                title={strings("label.enterPassword")}
                onDone={onPasswordDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.password")} onTextChange={() => null /* TODO */} />
                {
                    !errTextVisible ? null : (
                        <LeafText
                            style={{ color: errTextVisible ? LeafTypography.error.color : "transparent", paddingTop: 10 }}
                            typography={LeafTypography.error}
                        >
                            {strings("error.incorrectPassword")}
                        </LeafText>
                    )
                }
            </LeafPopUp>
        </View>
    );
};

export default AccountScreen;
