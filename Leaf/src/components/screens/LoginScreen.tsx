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
import { useNotificationSession } from "../base/LeafDropNotification/NotificationSession";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { showErrorNotification } = useNotificationSession();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onUsernameInput = (text: string) => {
        setUsername(text);
    };

    const onPasswordInput = (text: string) => {
        setPassword(text);
    };

    const allIsValid: () => boolean = () => {
        return ValidateUtil.stringIsValid(username);
        // TODO: Uncomment this when we implement passwords
        // ValidateUtil.stringIsValid(password)
    };

    const onLoginPressed = async () => {
        if (!allIsValid()) {
            showErrorNotification(strings("feedback.incorrectUsernamePassword"));
            return;
        }
        const id = new EmployeeID(username!);

        await Session.inst.fetchWorker(id);
        const worker = Session.inst.getWorker(id);
        if (worker != null && worker.accountActivated) {
            // We found the matching account!
            Session.inst.setLoggedInAccount(worker);
            StateManager.loginStatus.publish(LoginStatus.Worker);
            return;
        }

        await Session.inst.fetchLeader(id);
        const leader = Session.inst.getLeader(id);
        if (leader != null && leader.accountActivated) {
            // We found the matching account!
            Session.inst.setLoggedInAccount(leader);
            StateManager.loginStatus.publish(LoginStatus.Leader);
            return;
        }

        // No need to fetch admin - we don't maintain an admin store
        const admin = await Session.inst.getAdmin(id);
        if (admin != null && admin.accountActivated) {
            // We found the matching account!
            Session.inst.setLoggedInAccount(admin);
            StateManager.loginStatus.publish(LoginStatus.Admin);
            return;
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
