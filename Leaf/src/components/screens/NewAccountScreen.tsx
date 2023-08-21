import React, { useState } from "react";
import LeafTypography from "../styling/LeafTypography";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafColors from "../styling/LeafColors";
import { strings } from "../../localisation/Strings";
import VGap from "../containers/layout/VGap";
import EmployeeID from "../../model/employee/EmployeeID";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import RolePicker from "../custom/RolePicker";
import CreateAccountCard from "../custom/CreateAccountCard";
import Worker from "../../model/employee/Worker";
import { Role } from "../../model/employee/Role";
import { Hospitals } from "../../preset_data/Hospitals";
import FormHeader from "../custom/FormHeader";
import ValidateUtil from "../../utils/ValidateUtil";
import Admin from "../../model/employee/Admin";
import Leader from "../../model/employee/Leader";
import Session from "../../model/session/Session";
import Employee from "../../model/employee/Employee";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewAccountScreen: React.FC<Props> = ({ navigation }) => {
    const [createdAccount, setCreatedAccount] = React.useState<Employee | null>(null);
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [role, setRole] = React.useState<Role | undefined>(undefined);

    const onNameChange = (name: string) => {
        setName(name);
    };

    const onSurnameChange = (name: string) => {
        setSurname(name);
    };

    const onRoleChange = (role: Role | undefined) => {
        setRole(role);
    };

    const onSubmit = async () => {
        if (
            !(
                ValidateUtil.stringIsValid(name) &&
                ValidateUtil.stringIsValid(surname) &&
                ValidateUtil.valueIsDefined(role)
            )
        ) {
            setCreatedAccount(null);
            // TODO: Provide user feedback
            return;
        }

        let employee: Employee | null = null;
        if (role!.matches(Role.admin)) {
            const newAdmin = Admin.new(name, surname);
            const success = await Session.inst.submitNewAdmin(newAdmin);
            if (success) {
                employee = newAdmin;
            }
        } else if (role!.matches(Role.worker)) {
            const newWorker = Worker.new(name, surname);
            const success = await Session.inst.submitNewWorker(newWorker);
            if (success) {
                employee = newWorker;
            }
        } else if (role!.matches(Role.leader)) {
            const newLeader = Leader.new(name, surname);
            const success = await Session.inst.submitNewLeader(newLeader);
            if (success) {
                employee = newLeader;
            }
        }
        setCreatedAccount(employee);
    };

    return (
        <DefaultScreenContainer>
            <VStack spacing={16}>
                <RolePicker onSelection={onRoleChange} />

                <LeafTextInput
                    label={strings("inputLabel.givenName")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onNameChange}
                />

                <LeafTextInput
                    label={strings("inputLabel.surname")}
                    textColor={LeafColors.textDark}
                    color={LeafColors.textBackgroundDark}
                    onTextChange={onSurnameChange}
                />

                <VGap size={12} />

                <LeafButton
                    label={strings("button.createAccount")}
                    icon="account-plus"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    onPress={onSubmit}
                />

                <VGap size={12} />

                {createdAccount == null ? undefined : (
                    <CreateAccountCard
                        employee={createdAccount}
                    />
                )}
            </VStack>
        </DefaultScreenContainer>
    );
};

export default NewAccountScreen;
