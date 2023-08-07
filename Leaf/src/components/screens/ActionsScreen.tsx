import React from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import { View } from "react-native";
import LeafColors from "../styling/LeafColors";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import FlatContainer from "../containers/FlatContainer";
import Session from "../../model/session/Session";
import Spacer from "../containers/layout/Spacer";
import LeafButton from "../base/LeafButton/LeafButton";
import HStack from "../containers/HStack";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { strings } from "../../localisation/Strings";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActionsScreen: React.FC<Props> = ({ navigation }) => {
    const patient = Session.inst.getActivePatient();

    const onDone = () => {
        // TODO: save
        navigation.goBack();
    };

    const onCallPress = () => {};

    const onEmergencyPress = () => {};

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafDimensions.screenPadding,
            }}
        >
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatContainer style={{ width: "100%" }}>
                    <LeafText typography={LeafTypography.subscript}>{strings("actions.department")}</LeafText>
                    <LeafText typography={LeafTypography.title3}>{patient.triageCase.medicalUnit.name}</LeafText>
                </FlatContainer>

                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}>{strings("actions.steps")}</LeafText>
                    <LeafText>TODO: where are the steps?</LeafText>
                </FlatContainer>

                <HStack
                    spacing={LeafDimensions.screenSpacing}
                    style={{
                        flex: 1,
                    }}
                >
                    <FlatContainer
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                        onPress={onCallPress}
                    >
                        <LeafIcon icon={"phone"} size={100} color={LeafColors.textDark} />
                        {/* TODO: is there supposed to be a phone number attatched to patient? */}
                        <Spacer />
                        <LeafText wide={false} typography={LeafTypography.title3}>
                            {strings("actions.call")} {patient.phoneNumber}
                        </LeafText>
                    </FlatContainer>

                    <FlatContainer
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                        onPress={onEmergencyPress}
                    >
                        <LeafIcon icon={"exclamation"} size={100} color={LeafColors.textDark} />
                        <Spacer />
                        <LeafText wide={false} typography={LeafTypography.title3}>
                            {strings("actions.emergency")}
                        </LeafText>
                    </FlatContainer>
                </HStack>

                <Spacer />

                <LeafButton label={strings("button.done")} onPress={onDone} />
            </VStack>
        </View>
    );
};

export default ActionsScreen;
