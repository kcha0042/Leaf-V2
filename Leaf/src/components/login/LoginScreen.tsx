import { Flex, Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafTextInput from "../core/views/LeafTextInput/LeafTextInput";
import LeafDimensions from "../core/styles/LeafDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";


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
        console.log("TODO")
    }

    return (
        <VStack style={{ flex: 1 }} space={LeafDimensions.screenSpacing}>
            <Spacer/>

            <LeafText typography={LeafTypography.display} style={{ textAlign: 'center', paddingBottom: 20 }}>
                Login
            </LeafText>

            <VStack space={2}>
                <LeafTextInput
                    label="Username"
                    style={{ backgroundColor: "#ececec" }}
                    onTextChange={onUsernameInput}
                />

                <LeafTextInput
                    label="Password"
                    style={{ backgroundColor: "#ececec" }}
                    onTextChange={onPasswordInput}
                />
            </VStack>

            <LeafButton 
                label="Login"
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