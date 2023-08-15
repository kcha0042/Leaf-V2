import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafCheckbox from "../base/LeafCheckbox/LeafCheckbox";
import LeafText from "../base/LeafText/LeafText";
import LeafTextButton from "../base/LeafTextButton/LeafTextButton";
import LeafTextInputShort from "../base/LeafTextInputShort/LeafTextInputShort";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import ActivateAccountScreen from "./ActivateAccountScreen";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onUsernameInput = (text) => {
        setUsername(text);
    };

    const onPasswordInput = (text) => {
        setPassword(text);
    };

    const onLoginPressed = () => {
        // TODO: Obviously this entire thing will be reworked in time
        switch (username.toLowerCase()) {
            case "worker":
            case "w":
                StateManager.loginStatus.publish(LoginStatus.Worker);
                break;
            case "leader":
            case "l":
                StateManager.loginStatus.publish(LoginStatus.Leader);
                break;
            case "admin":
            case "a":
                StateManager.loginStatus.publish(LoginStatus.Admin);
                break;
        }
    };

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

            <LeafText typography={LeafTypography.display} style={{ textAlign: "center", paddingBottom: 20 }}>
                {strings("login.title")}
            </LeafText>

            <View
                style={{
                    maxWidth: 400,
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <LeafTextInputShort
                    label={strings("inputLabel.username")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onUsernameInput}
                />

                <VGap size={LeafDimensions.textInputSpacing} />

                <LeafTextInputShort
                    label={strings("inputLabel.password")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onPasswordInput}
                />

                <VGap size={LeafDimensions.textInputSpacing} />

                <HStack
                    style={{
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <LeafCheckbox
                        initialValue={true}
                        onValueChange={(isTicked) => {}}
                        color={LeafColors.textSemiDark}
                        style={{
                            marginRight: 8,
                        }}
                    />

                    <LeafText typography={LeafTypography.subscript.withWeight(LeafFontWeight.SemiBold)} wide={false}>
                        {strings("label.rememberMe")}
                    </LeafText>

                    <Spacer />

                    <LeafTextButton
                        label={strings("button.activateAccount")}
                        onPress={() => {
                            NavigationSession.inst.navigateTo(ActivateAccountScreen, navigation, undefined);
                        }}
                        typography={LeafTypography.subscript.withWeight(LeafFontWeight.SemiBold)}
                    />
                </HStack>

                <LeafButton
                    label={strings("button.login")}
                    icon="arrow-right-circle"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    style={{ marginTop: 36 }}
                    onPress={onLoginPressed}
                />
            </View>

            <Spacer />

            <Spacer />

            <Spacer />
        </VStack>
    );
};

export default LoginScreen;
