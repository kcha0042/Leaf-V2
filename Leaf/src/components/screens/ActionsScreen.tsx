import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import LeafButton from "../base/LeafButton/LeafButton";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { ErrorScreen } from "./ErrorScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import VGap from "../containers/layout/VGap";
import LargeMenuButton from "../custom/LargeMenuButton";
import { Linking } from "react-native";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import { capitalized } from "../../language/functions/Capitalized";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActionsScreen: React.FC<Props> = ({ navigation }) => {
    const buttonSpacing = LeafDimensions.screenSpacing;

    const typography = LeafTypography.body;

    const patient = Session.inst.getActivePatient();

    if (!patient) {
        return <ErrorScreen />;
    }

    const onDone = () => {
        NavigationSession.inst.navigateBack(navigation);
    };

    const dialCall = async (number: string) => {
        let dial = `tel:${number}`;
        const canCall = await Linking.canOpenURL(dial);
        if (!canCall) {
            console.log("[ACTION SCREEN] Phone number is not available");
            // TODO: status update, this should be done after merge
        }

        try {
            await Linking.openURL(dial);
        } catch (error) {
            console.log("[ACTIONS SCREEN] Could not call number");
            // TODO: status update, this should be done after merge
        }
    };

    const onCallPress = () => {
        dialCall(patient.phoneNumber);
    };

    const onEmergencyPress = () => {
        // We don't want to call emergency services
        // If we did, it'd be implemented here
        // dialCall(strings("emergencyPhone.number"));
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.cardSpacing}
                style={{
                    flex: 1,
                }}
            >
                <FlatContainer style={{ width: "100%" }}>
                    <LeafText typography={LeafTypography.subscript}>{strings("actions.arrivalWard")}</LeafText>

                    <LeafText typography={LeafTypography.title2}>{patient.triageCase.arrivalWard.name}</LeafText>
                </FlatContainer>

                <FlatContainer>
                    <LeafText typography={LeafTypography.title3.withWeight(LeafFontWeight.Bold)}>
                        {capitalized(strings("actions.steps"))}
                    </LeafText>

                    <VGap size={16} />

                    <VStack spacing={12}>
                        {patient.triageCase.triageCode.getSteps().map((step, i) => (
                            <LeafText
                                key={step}
                                wide={false}
                                typography={typography}
                                style={{ alignSelf: "flex-start" }}
                            >
                                {i + 1}: {step}
                            </LeafText>
                        ))}
                    </VStack>
                </FlatContainer>

                <HStack
                    spacing={buttonSpacing}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <LargeMenuButton
                        label={patient.phoneNumber}
                        description={strings("actions.callPatient", patient.fullName)}
                        icon={"phone"}
                        onPress={onCallPress}
                    />

                    <LargeMenuButton
                        label={strings("actions.emergency")}
                        description={strings("actions.callEmergency")}
                        icon={"alert"}
                        onPress={onEmergencyPress}
                    />
                </HStack>

                <Spacer />

                <LeafButton label={strings("button.done")} onPress={onDone} />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default ActionsScreen;
