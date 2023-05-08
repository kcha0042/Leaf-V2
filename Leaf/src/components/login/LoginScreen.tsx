import { Box, Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafTextInput from "../core/views/LeafTextInput/LeafTextInput";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import { strings } from "../../localisation/Strings";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";

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
        // TODO: Obviously this entire thing will be reworked in time
        switch (username.toLowerCase()) {
            case "worker":
            case "w":
                StateManager.loginStatus.publish(LoginStatus.worker);
                break;
            case "leader":
            case "l":
                StateManager.loginStatus.publish(LoginStatus.leader);
                break;
            case "admin":
            case "a":
                StateManager.loginStatus.publish(LoginStatus.admin);
                break;
        }
    }

    return (
        <VStack 
            style={{ flex: 1 }} 
            space={LeafBaseDimensions.screenSpacing} 
            alignItems={"center"} 
            width={"100%"}
            padding={LeafBaseDimensions.screenPadding}
        >
            <Spacer />

            <LeafText 
                typography={LeafTypography.display} 
                style={{ textAlign: 'center', paddingBottom: 20 }}
            >
                {strings("login.title")}
            </LeafText>

            <Box maxWidth={"400px"} alignItems={"center"} width={"100%"}>
                <LeafTextInput
                    label={strings("login.inputLabel.username")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onUsernameInput}
                />

                <Spacer size={2} />

                <LeafTextInput
                    label={strings("login.inputLabel.password")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onPasswordInput}
                />

                <LeafButton 
                    label={strings("button.login")}
                    icon="arrow-right-circle"
                    typography={LeafTypography.primaryButton}
                    type={LeafButtonType.filled} 
                    color={LeafColors.accent}
                    style={{ marginTop: 40 }}
                    onPress={onLoginPressed}
                />
            </Box>

            <Spacer />
            
            <Spacer />

            <Spacer />

            {/* TODO: Remove later */}
            <LeafText typography={LeafTypography.body} >
                {'TEMP: For now, just login using "W"/"Worker", "L"/"Leader" or "A"/"Admin" as the username.'}
            </LeafText>
        </VStack>
    );
}

export default LoginScreen;