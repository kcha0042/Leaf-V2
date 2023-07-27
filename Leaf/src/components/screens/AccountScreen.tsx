import React, { useEffect, useState } from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafButton from "../base/LeafButton/LeafButton";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import { View } from "react-native";
import FlatContainer from "../containers/FlatContainer";
import Spacer from "../containers/layout/Spacer";
import LeafColors from "../styling/LeafColors";
import { strings } from "../../localisation/Strings";
import Session from "../../model/Session";
import EmployeeID from "../../model/employee/EmployeeID";
import Worker from "../../model/employee/Worker";
import HStack from "../containers/HStack";
import LeafTextButton from "../base/LeafTextButton/LeafTextButton";
import { LeafPopUp } from "../base/LeafPopUp/LeafPopUp";
import LeafTextInputShort from "../base/LeafTextInputShort/LeafTextInputShort";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
    // TODO: change this when we have a way of getting the ID
    const tmpID = new EmployeeID("123-123");

    const [worker, setWorker] = React.useState<Worker | null>(Session.inst.getWorker(tmpID));
    const [name, setName] = React.useState<string>(worker?.fullName || "...loading");
    const [email, setEmail] = React.useState<string>(worker?.email || "...loading");
    const [hospital, setHospital] = React.useState<string>(worker?.currentHospital.name || "...loading");

    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            const tmpWorker = Session.inst.getWorker(tmpID);
            setWorker(tmpWorker);
            setName(tmpWorker?.fullName || "");
            setEmail(tmpWorker?.email || "");
            setHospital(tmpWorker?.currentHospital.name || "");
        });

        Session.inst.fetchAllWorkers();
        Session.inst.fetchAllHospitals();
    }, []);

    StateManager.workersFetched.subscribe(() => {
        setWorker(Session.inst.getWorker(tmpID));
    });

    const logOut = () => {
        StateManager.loginStatus.publish(LoginStatus.LoggedOut);
    };

    // Text change
    let newName = "";
    const onNameChange = (name: string) => {
        newName = name;
    };

    let newEmail = "";
    const onEmailChange = (email: string) => {
        newEmail = email;
    };

    let newHospital = "";
    const onHospitalChange = (hospital: string) => {
        newHospital = hospital;
    };

    // Pop ups
    // I assume we are going to have an active account or something in the model? That we can
    const [editNameVisible, setEditNameVisible] = useState(false);
    const onNameDone = () => {
        setName(newName);
        setEditNameVisible(false);
        // TODO: change name in model
    };

    const [editEmailVisible, setEditEmailVisible] = useState(false);
    const onEmailDone = () => {
        setEmail(newEmail);
        setEditEmailVisible(false);
        // TODO: change email in model
    };

    const [editHospitalVisible, setEditHospitalVisible] = useState(false);
    const onHospitalDone = () => {
        const hospitals = Session.inst.getAllHospitals();
        // Checking hospital exists
        let hospitalExists = false;
        for (let hospital of hospitals){
            if (hospital.name == newHospital){
                hospitalExists = true;
                setHospital(newHospital);
                setEditHospitalVisible(false);
                break;
            }
        }

        if (!hospitalExists){
            // TODO: handle error
        }
    };

    const [enterPasswordVisible, setEnterPasswordVisible] = useState(false);
    const onPasswordDone = () => {
        // TODO: replace with password validation
        if (true){
            setEditHospitalVisible(true);
            setEnterPasswordVisible(false);
        }else{
            // TODO: snackbar? I was thinking we could wrap the app in a provider that creates snackbars for user messages (similar to spotify)
            // TODO: you could then create a new status message which publishes state with a message, the wrapper then subscribes to this state and reacts.
            // Could also just have a message above the text input.
        }
    };

    const onCancel = () => {
        setEditNameVisible(false);
        setEditEmailVisible(false);
        setEditHospitalVisible(false);
        setEnterPasswordVisible(false);
    };

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
                    <LeafText typography={LeafTypography.title3}> {strings("label.details")} </LeafText>

                    <HStack spacing={6} style={{ width: "100%", paddingBottom: 5, alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {" "}
                            {name}{" "}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={"edit"} onPress={() => setEditNameVisible(true)} />
                    </HStack>

                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {" "}
                            {email}{" "}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={"edit"} onPress={() => setEditEmailVisible(true)} />
                    </HStack>
                </FlatContainer>

                {/* Hospital */}
                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}> {strings("label.hospital")} </LeafText>

                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {" "}
                            {hospital}{" "}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={"edit"} onPress={() => setEnterPasswordVisible(true)} />
                    </HStack>
                </FlatContainer>

                <Spacer />

                <LeafButton label={"Logout"} onPress={logOut} />
            </VStack>

            {/* Edit name */}
            <LeafPopUp visible={editNameVisible} title={"Edit name"} onDone={onNameDone} onCancel={onCancel}>
                <LeafTextInputShort label={"Name"} onTextChange={onNameChange} />
            </LeafPopUp>

            {/* Edit email */}
            <LeafPopUp visible={editEmailVisible} title={"Edit email"} onDone={onEmailDone} onCancel={onCancel}>
                <LeafTextInputShort label={"Email"} onTextChange={onEmailChange} />
            </LeafPopUp>

            {/* Edit email */}
            <LeafPopUp visible={editHospitalVisible} title={"Edit hospital"} onDone={onHospitalDone} onCancel={onCancel}>
                <LeafTextInputShort label={"Hospital"} onTextChange={onHospitalChange} />
            </LeafPopUp>

            {/* Check password */}
            <LeafPopUp visible={enterPasswordVisible} title={"Enter password"} onDone={onPasswordDone} onCancel={onCancel}>
                <LeafTextInputShort label={"Password"} onTextChange={() => null /* TODO */} />
            </LeafPopUp>
        </View>
    );
};

export default AccountScreen;
