import { Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafTextInput from "../core/views/LeafTextInput/LeafTextInput";
import LeafDimensions from "../core/styles/LeafDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import { strings } from "../../localisation/Strings";
import StateManager from "../../state/StateManager";

const LoginScreen: React.FC = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onUsernameInput = (text) => {
        setUsername(text);
    }

    const onPasswordInput = (text) => {
        setPassword(text);
    }

    const onLoginPressed = () => {
        StateManager.isLoggedIn.publish(true);
    }

    return (
        <VStack style={{ flex: 1 }} space={LeafDimensions.screenSpacing}>
            <Spacer/>

            <LeafText typography={LeafTypography.display} style={{ textAlign: 'center', paddingBottom: 20 }}>
                {strings("login.title")}
            </LeafText>

            <VStack space={2}>
                <LeafTextInput
                    label={strings("login.inputLabel.username")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onUsernameInput}
                />

                <LeafTextInput
                    label={strings("login.inputLabel.password")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onPasswordInput}
                />
            </VStack>

            <LeafButton 
                label={strings("button.login")}
                icon="arrow-right-circle"
                typography={LeafTypography.primaryButton}
                type={LeafButtonType.filled} 
                color={LeafColors.accent}
                style={{ marginTop: 30 }}
                onPress={onLoginPressed}
            />

            <Spacer />
            
            <Spacer />

            <Spacer />
        </VStack>
    );
}

export default LoginScreen;