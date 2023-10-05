import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
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
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import KeyboardAwareScreenContainer from "./containers/KeyboardAwareScreenContainer";
import ValidateUtil from "../../utils/ValidateUtil";
import Session from "../../model/session/Session";
import EmployeeID from "../../model/employee/EmployeeID";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import Account from "../../model/account/Account";
import PasswordUtil from "../../utils/PasswordUtil";
import LeafPasswordInput from "../base/LeafPasswordInput/LeafPasswordInput";
import LeafPasswordInputShort from "../base/LeafPasswordInputShort/LeafPasswordInputShort";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActivateAccountScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [confirmationPassword, setConfirmationPassword] = useState<string | undefined>(undefined);

    const allIsValid: () => boolean = () => {
        return (
            ValidateUtil.stringIsValid(username) &&
            ValidateUtil.emailIsValid(email) &&
            ValidateUtil.stringIsValid(password) &&
            ValidateUtil.stringIsValid(confirmationPassword) &&
            password == confirmationPassword
        );
    };

    const onSubmit = async () => {
        if (!allIsValid()) {
            // TODO: Provide feedback
            console.log("Invalid inputs");
            return;
        }
        const id = new EmployeeID(username!);

        // hashing password
        let hashedPassword = undefined;
        if (password != undefined) {
            hashedPassword = PasswordUtil.hashPassword(password);
        }

        await Session.inst.fetchWorker(id);
        const worker = Session.inst.getWorker(id);
        if (worker != null && !worker.accountActivated) {
            // We found the matching account!
            worker.setAccountActivated(true);
            worker.setEmail(email!);
            // Create new account in the database with ID and password
            if (hashedPassword != undefined) {
                const newAccount = new Account(id, hashedPassword);
                Session.inst.activateNewAccount(newAccount);
            }
            Session.inst.updateWorker(worker);
            Session.inst.setLoggedInAccount(worker);
            // TODO: Provide feedback (login successful)
            StateManager.loginStatus.publish(LoginStatus.Worker);
            return;
        }

        await Session.inst.fetchLeader(id);
        const leader = Session.inst.getLeader(id);
        if (leader != null && !leader.accountActivated) {
            // We found the matching account!
            leader.setAccountActivated(true);
            leader.setEmail(email!);
            // Create new account in the database with ID and password
            if (hashedPassword != undefined) {
                const newAccount = new Account(id, hashedPassword);
                Session.inst.activateNewAccount(newAccount);
            }
            Session.inst.updateLeader(leader);
            Session.inst.setLoggedInAccount(leader);
            // TODO: Provide feedback (login successful)
            StateManager.loginStatus.publish(LoginStatus.Leader);
            return;
        }

        // No need to fetch admin - we don't maintain an admin store
        const admin = await Session.inst.getAdmin(id);
        if (admin != null && !admin.accountActivated) {
            // We found the matching account!
            admin.setAccountActivated(true);
            admin.setEmail(email!);
            // Create new account in the database with ID and password
            if (hashedPassword != undefined) {
                const newAccount = new Account(id, hashedPassword);
                Session.inst.activateNewAccount(newAccount);
            }
            Session.inst.updateAdmin(admin);
            Session.inst.setLoggedInAccount(admin);
            // TODO: Provide feedback (login successful)
            StateManager.loginStatus.publish(LoginStatus.Admin);
            return;
        }

        // TODO: Provide feedback
        console.log("No unactivated account found with id");
    };

    return (
        <KeyboardAwareScreenContainer centerContent={true}>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                    flexWrap: "nowrap",
                }}
            >
                <LeafText typography={LeafTypography.headerScreen} style={{ textAlign: "center", paddingBottom: 20 }}>
                    {strings("login.activateAccount")}
                </LeafText>

                <View
                    style={{
                        maxWidth: 400,
                        width: "100%",
                    }}
                >
                    <LeafTextInput
                        label={strings("inputLabel.providedUsername")}
                        textColor={
                            ValidateUtil.stringIsValid(username) || !username
                                ? LeafColors.textDark
                                : LeafColors.textError
                        }
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setUsername(text);
                        }}
                    />

                    <VGap size={LeafDimensions.textInputSpacing} />

                    <LeafTextInput
                        label={strings("inputLabel.setEmail")}
                        textColor={
                            ValidateUtil.emailIsValid(email) || !email ? LeafColors.textDark : LeafColors.textError
                        }
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setEmail(text);
                        }}
                    />

                    <VGap size={LeafDimensions.textInputSpacing} />

                    <LeafPasswordInputShort
                        label={strings("inputLabel.setPassword")}
                        textColor={
                            ValidateUtil.stringIsValid(password) || !password
                                ? LeafColors.textDark
                                : LeafColors.textError
                        }
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setPassword(text);
                        }}
                    />

                    <VGap size={LeafDimensions.textInputSpacing} />

                    <LeafPasswordInputShort
                        label={strings("inputLabel.confirmPassword")}
                        textColor={
                            ValidateUtil.stringIsValid(confirmationPassword) && confirmationPassword == password
                                ? LeafColors.textDark
                                : LeafColors.textError
                        }
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setConfirmationPassword(text);
                        }}
                    />

                    <LeafButton
                        label={strings("button.activate")}
                        icon="badge-account-horizontal"
                        typography={LeafTypography.button}
                        type={LeafButtonType.Filled}
                        color={LeafColors.accent}
                        style={{ marginTop: 36 }}
                        onPress={onSubmit}
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
            </VStack>
        </KeyboardAwareScreenContainer>
    );
};

export default ActivateAccountScreen;
