import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import LargeMenuButton from "../custom/LargeMenuButton";
import StateManager from "../../state/publishers/StateManager";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActionsScreen: React.FC<Props> = ({ navigation }) => {

    useEffect(() => {
        const unsubscribe = StateManager.contentWidth.subscribe(() => {
            setComponentWidth(StateManager.contentWidth.read())
        })

        return unsubscribe;
    }, [])

    const [componentWidth, setComponentWidth] = useState(StateManager.contentWidth.read());
    const buttonSpacing = LeafDimensions.screenSpacing;
    let columnCount = 2;
    if (componentWidth < 375) {
        columnCount = 1;
    }
    // TODO: this doesnt look right on web, why? This formula should calculate the size needed to fit buttons into x columns and fill the screen?
    // btw it works fine on tablet
    const buttonWidth = (componentWidth - (columnCount - 1) * buttonSpacing) / columnCount;

    const typography = LeafTypography.body;
    typography.size = 18;

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
                    <LeafText typography={LeafTypography.subscript}>{strings("actions.arrivalWard")}</LeafText>
                    <LeafText typography={LeafTypography.title2}>{patient.triageCase.arrivalWard.name}</LeafText>
                </FlatContainer>

                <FlatContainer>
                    <LeafText typography={LeafTypography.title3}>{strings("actions.steps")}</LeafText>
                    <VGap size={20}/>
                    <VStack spacing={20}>
                        {patient.triageCase.triageCode.getSteps().map((step, i) => (
                            <LeafText key={step} wide={false} typography={typography} style={{ alignSelf: "flex-start" }}>
                                {i + 1}: {step}
                            </LeafText>
                        ))}
                    </VStack>
                    <VGap size={20} />
                </FlatContainer>

                <HStack
                    spacing={buttonSpacing}
                    style={{
                        flex: 1,
                        justifyContent: "center"
                    }}
                >
                    <LargeMenuButton
                        label={patient.phoneNumber}
                        description={strings("actions.callPatient", patient.fullName)}
                        icon={"phone"}
                        size={buttonWidth}
                        onPress={onCallPress}
                    />

                    <LargeMenuButton
                        label={strings("actions.emergency")}
                        description={strings("actions.callEmergency")}
                        icon={"alert"}
                        size={buttonWidth}
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
