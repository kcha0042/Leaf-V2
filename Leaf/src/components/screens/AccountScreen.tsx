import React, { useEffect, useState } from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import LeafButton from "../base/LeafButton/LeafButton";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
    
    useEffect(() => {
        StateManager.workersFetched.subscribe(() => {
            setWorker(Session.inst.getWorker(tmpID));
        })

        Session.inst.fetchAllWorkers();
    }, []);

    StateManager.workersFetched.subscribe(() => {
        setWorker(Session.inst.getWorker(tmpID));
    })

    const logOut = () => {
        StateManager.loginStatus.publish(LoginStatus.LoggedOut);
    }
    
    // Pop ups
    const [editNameVisible, setEditNameVisible] = useState(false);
    const onNameDone = () => {

    }

    const [editEmailVisible, setEditEmailVisible] = useState(false);
    const onEmailDone = () => {

    }

    const [editHospitalVisible, setEditHospitalVisible] = useState(false);
    const onHospitalDone = () => {

    }

    const onCancel = () => {
        setEditNameVisible(false);
        setEditEmailVisible(false);
        setEditHospitalVisible(false);
    }

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
                    flex: 1
                }}
            >
                {/* Details */}
                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}> {strings("label.details")} </LeafText>

                    <HStack spacing={6} style={{ width: "100%", paddingBottom: 5, alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}> {worker?.fullName || ""} </LeafText>
                        <Spacer />
                        <LeafTextButton label={"edit"} onPress={() => setEditNameVisible(true)}/>
                    </HStack>
                    
                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}> {worker?.email || ""} </LeafText>
                        <Spacer />
                        <LeafTextButton label={"edit"} onPress={() => setEditEmailVisible(true)}/>
                    </HStack>
                </FlatContainer>

                {/* Hospital */}
                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}> {strings("label.hospital")} </LeafText>
                    <LeafText typography={LeafTypography.body}> TODO: Hospital name </LeafText>
                </FlatContainer>

                <Spacer />
                
                <LeafButton 
                    label={"Logout"}
                    onPress={logOut}
                />
            </VStack>

            {/* Edit name */}
            <LeafPopUp
                visible={editNameVisible}
                title={"Edit name"}
                onDone={onNameDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort 
                    label={"Name"}
                    onTextChange={() => null}
                />
            </LeafPopUp>

            {/* Edit email */}
            <LeafPopUp
                visible={editEmailVisible}
                title={"Edit email"}
                onDone={onEmailDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort 
                    label={"Email"}
                    onTextChange={() => null}
                />
            </LeafPopUp>

        </View>
    );
};

export default AccountScreen;
