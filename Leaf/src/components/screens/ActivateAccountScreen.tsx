import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafText from "../base/LeafText/LeafText";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActivateAccountScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <VStack
            spacing={LeafDimensions.screenSpacing}
            style={{
                flex: 1,
                alignItems: "center",
                width: "100%",
                padding: LeafDimensions.screenPadding,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
            }}
        >
            <Spacer />

            <LeafText typography={LeafTypography.headerScreen} style={{ textAlign: "center", paddingBottom: 20 }}>
                {strings("login.activateAccount")}
            </LeafText>

            <View
                style={{
                    maxWidth: 400,
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <LeafTextInput
                    label={strings("inputLabel.username")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={() => {}}
                />

                <VGap size={LeafDimensions.textInputSpacing} />

                <LeafTextInput
                    label={strings("inputLabel.setPassword")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={() => {}}
                />

                <VGap size={LeafDimensions.textInputSpacing} />

                <LeafTextInput
                    label={strings("inputLabel.confirmPassword")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={() => {}}
                />

                <LeafButton
                    label={strings("button.activate")}
                    icon="badge-account-horizontal"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    style={{ marginTop: 36 }}
                    onPress={() => {}}
                />

                <LeafButton
                    label={strings("button.cancel")}
                    typography={LeafTypography.button.withColor(LeafColors.textSemiDark)}
                    type={LeafButtonType.Filled}
                    color={LeafColors.fillBackgroundLight}
                    style={{ marginTop: 12 }}
                    onPress={() => {
                        NavigationSession.inst.navigateBack(navigation);
                    }}
                />
            </View>

            <Spacer />

            <Spacer />

            <Spacer />
        </VStack>
    );
};

export default ActivateAccountScreen;
