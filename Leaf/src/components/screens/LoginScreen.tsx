import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafText from "../base/LeafText/LeafText";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import LeafTextInputShort from "../base/LeafTextInputShort/LeafTextInputShort";
import Session from "../../model/Session";
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

    const onActivatePressed = () => {
        NavigationSession.inst.navigateTo(ActivateAccountScreen, navigation, "Account Activation");
    
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
                    label={strings("login.inputLabel.username")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onUsernameInput}
                />

                <VGap size={8} />

                <LeafTextInputShort
                    label={strings("login.inputLabel.password")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onPasswordInput}
                />

                <LeafButton
                    label={strings("button.login")}
                    icon="arrow-right-circle"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    style={{ marginTop: 40 }}
                    onPress={onLoginPressed}
                />
                
                <LeafButton
                    label={strings("button.activateAccount")}
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    style={{ marginTop: 40 }}
                    onPress={onActivatePressed}
                />
            </View>

            <Spacer />

            <Spacer />

            <Spacer />
        </VStack>
    );
};

export default LoginScreen;
