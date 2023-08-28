import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import LeafButton from "../base/LeafButton/LeafButton";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { ErrorScreen } from "./ErrorScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import VGap from "../containers/layout/VGap";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActionsScreen: React.FC<Props> = ({ navigation }) => {
    const patient = Session.inst.getActivePatient();

    if (!patient) {
        return <ErrorScreen />;
    }

    const onDone = () => {
        // TODO: save
        NavigationSession.inst.navigateBack(navigation);
    };

    const onCallPress = () => {};

    const onEmergencyPress = () => {};

    return (
        <DefaultScreenContainer>
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
                    <VGap size={20}/>
                    <VStack spacing={20}>
                        {patient.triageCase.triageCode.getSteps().map((step, i) => (
                            <LeafText key={step} wide={false} style={{ alignSelf: "flex-start" }}>
                                {i + 1}: {step}
                            </LeafText>
                        ))}
                    </VStack>
                    <VGap size={20} />
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
        </DefaultScreenContainer>
    );
};

export default ActionsScreen;
