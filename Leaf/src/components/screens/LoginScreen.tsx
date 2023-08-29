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
import ValidateUtil from "../../utils/ValidateUtil";
import EmployeeID from "../../model/employee/EmployeeID";
import Session from "../../model/session/Session";
import bcrypt from "bcryptjs";
import ResetPasswordScreen from "./ResetPasswordScreen";
import LeafPasswordInput from "../base/LeafPasswordInput/LeafPasswordInput";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onUsernameInput = (text: string) => {
        setUsername(text);
    };

    const onPasswordInput = (text: string) => {
        setPassword(text);
    };

    const allIsValid: () => boolean = () => {
        // TODO: Uncomment this when we implement passwords
        // ValidateUtil.stringIsValid(password)
        return (ValidateUtil.stringIsValid(username) && ValidateUtil.stringIsValid(password))
    };

    const onLoginPressed = async () => {
        if (!allIsValid()) {
            // TODO: Provide feedback
            console.log("Wrong username/password");
            return;
        }
        const id = new EmployeeID(username!);

        await Session.inst.fetchWorker(id);
        const worker = Session.inst.getWorker(id);
        if (worker != null && worker.accountActivated && worker.password != null) {
            // Hash and check the entered password to the hashed password retrieve from database
            if (bcrypt.compareSync(password, worker.password)) {
                // We found the matching account!
                Session.inst.setLoggedInAccount(worker);
                // TODO: Provide feedback (login successful)
                StateManager.loginStatus.publish(LoginStatus.Worker);
                return;
            }
            else {
                // TODO: Provide feedback (login failed)
                console.log("Login Failed");
            }
        }

        await Session.inst.fetchLeader(id);
        const leader = Session.inst.getLeader(id);
        if (leader != null && leader.accountActivated && leader.password != null) {
            // Hash and check the entered password to the hashed password retrieve from database
            if (bcrypt.compareSync(password, leader.password)) {
                // We found the matching account!
                Session.inst.setLoggedInAccount(leader);
                // TODO: Provide feedback (login successful)
                StateManager.loginStatus.publish(LoginStatus.Leader);
                return;
            }
            else {
                // TODO: Provide feedback (login failed)
                console.log("Login Failed");
            }
        }

        // No need to fetch admin - we don't maintain an admin store
        const admin = await Session.inst.getAdmin(id);
        if (admin != null && admin.accountActivated && admin.password != null) {
            // Hash and check the entered password to the hashed password retrieve from database
            if (bcrypt.compareSync(password, admin.password)) {
                // We found the matching account!
                Session.inst.setLoggedInAccount(admin);
                // TODO: Provide feedback (login successful)
                StateManager.loginStatus.publish(LoginStatus.Admin);
                return;
            }
            else {
                // TODO: Provide feedback (login failed)
                console.log("Login Failed")
            }
            
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

                <LeafPasswordInput
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
                        label={strings("button.resetPassword")}
                        onPress={() => {
                            NavigationSession.inst.navigateTo(ResetPasswordScreen, navigation, undefined);
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
                <LeafButton
                    label={strings("button.activateAccount")}
                    icon="arrow-right-circle"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    style={{ marginTop: 12 }}
                    onPress={() => {
                        NavigationSession.inst.navigateTo(ActivateAccountScreen, navigation, undefined);
                    }}
                />
            </View>

            <Spacer />

            <Spacer />

            <Spacer />
        </VStack>
    );
};

export default LoginScreen;
