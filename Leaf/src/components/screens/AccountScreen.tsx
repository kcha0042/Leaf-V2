import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import Worker from "../../model/employee/Worker";
import Session from "../../model/session/Session";
import { HospitalArray } from "../../preset_data/Hospitals";
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

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
    const [worker, setWorker] = React.useState<Worker | null>(Session.inst.loggedInAccount as Worker);
    const [name, setName] = React.useState<string>(worker?.fullName || strings("label.loading"));
    const [email, setEmail] = React.useState<string>(worker?.email || strings("label.loading"));
    const [hospital, setHospital] = React.useState<string>(worker?.currentHospital?.name || strings("label.loading"));

    useEffect(() => {
        const unsubscribe = StateManager.workersFetched.subscribe(() => {
            // If the logged in worker gets updated and hence fetched, we refresh this
            const tmpWorker = Session.inst.loggedInAccount as Worker;
            setWorker(tmpWorker);
            setName(tmpWorker?.fullName || "");
            setEmail(tmpWorker?.email || "");
            setHospital(tmpWorker?.currentHospital?.name || "");
        });

        Session.inst.fetchWorker(Session.inst.loggedInAccount.id);

        return () => {
            unsubscribe();
        };
    }, []);

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

    const [errTextVisible, setErrTextVisible] = useState(false);
    const [editHospitalVisible, setEditHospitalVisible] = useState(false);
    const onHospitalDone = () => {
        const hospitals = HospitalArray;
        // Checking hospital exists
        let hospitalExists = false;
        for (const hospital of hospitals) {
            if (hospital.name == newHospital) {
                hospitalExists = true;
                setHospital(newHospital);
                setEditHospitalVisible(false);
                break;
            }
        }

        setErrTextVisible(!hospitalExists);
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
                            {name}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={strings("button.edit")} onPress={() => setEditNameVisible(true)} />
                    </HStack>

                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {email}
                        </LeafText>
                        <Spacer />
                        <LeafTextButton label={strings("button.edit")} onPress={() => setEditEmailVisible(true)} />
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
                        <LeafTextButton label={strings("button.edit")} onPress={() => setEnterPasswordVisible(true)} />
                    </HStack>
                </FlatContainer>

                <Spacer />

                <LeafButton label={strings("button.logout")} onPress={logOut} />
            </VStack>

            {/* Edit name */}
            <LeafPopUp
                visible={editNameVisible}
                title={strings("label.editName")}
                onDone={onNameDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.givenName")} onTextChange={onNameChange} />
            </LeafPopUp>

            {/* Edit email */}
            <LeafPopUp
                visible={editEmailVisible}
                title={strings("label.editEmail")}
                onDone={onEmailDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.email")} onTextChange={onEmailChange} />
            </LeafPopUp>

            {/* Edit hospital */}
            <LeafPopUp
                visible={editHospitalVisible}
                title={strings("label.editHospital")}
                onDone={onHospitalDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("label.hospital")} onTextChange={onHospitalChange} />
                <LeafText
                    style={{ color: errTextVisible ? LeafTypography.error.color : "transparent", paddingTop: 10 }}
                    typography={LeafTypography.error}
                >
                    {strings("error.hospitalExists")}
                </LeafText>
            </LeafPopUp>

            {/* Check password */}
            <LeafPopUp
                visible={enterPasswordVisible}
                title={strings("label.enterPassword")}
                onDone={onPasswordDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.password")} onTextChange={() => null /* TODO */} />
                <LeafText
                    style={{ color: errTextVisible ? LeafTypography.error.color : "transparent", paddingTop: 10 }}
                    typography={LeafTypography.error}
                >
                    Incorrect password
                </LeafText>
            </LeafPopUp>
        </View>
    );
};

export default AccountScreen;
