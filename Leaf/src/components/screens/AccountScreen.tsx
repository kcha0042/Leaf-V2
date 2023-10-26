import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import { HospitalArray } from "../../preset_data/Hospitals";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafPopUp } from "../base/LeafPopUp/LeafPopUp";
import LeafText from "../base/LeafText/LeafText";
import LeafTextButton from "../base/LeafTextButton/LeafTextButton";
import LeafTextInputShort from "../base/LeafTextInputShort/LeafTextInputShort";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import Employee from "../../model/employee/Employee";
import AdminsManager from "../../model/session/AdminsManager";
import LeadersManager from "../../model/session/LeadersManager";
import WorkersManager from "../../model/session/WorkersManager";
import Admin from "../../model/employee/Admin";
import Leader from "../../model/employee/Leader";
import Worker from "../../model/employee/Worker";
import { UnreachableCaseError } from "../../language/errors/UnreachableCaseError";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import VGap from "../containers/layout/VGap";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
    const [employee, setEmployee] = React.useState<Employee | null>(Session.inst.loggedInAccount);
    const [fName, setFName] = React.useState<string>(employee?.firstName || strings("label.loading"));
    const [lName, setLName] = React.useState<string>(employee?.lastName || strings("label.loading"));
    const [email, setEmail] = React.useState<string>(employee?.email || strings("label.loading"));

    useEffect(() => {
        const unsubscribe = StateManager.workersFetched.subscribe(() => {
            // If the logged in worker gets updated and hence fetched, we refresh the details
            const activeEmployee = Session.inst.loggedInAccount;
            setEmployee(activeEmployee);
            setFName(activeEmployee?.firstName || "");
            setLName(activeEmployee?.lastName || "");
            setEmail(activeEmployee?.email || "");
        });

        Session.inst.fetchWorker(Session.inst.loggedInAccount.id);

        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        StateManager.loginStatus.publish(LoginStatus.LoggedOut);
        // TODO: Do we need to change anything in session?
    };

    const updateEmployee = (employee: Employee) => {
        switch (StateManager.loginStatus.read()) {
            case LoginStatus.Admin:
                AdminsManager.inst.updateAdmin(employee as Admin);
                break;
            case LoginStatus.Leader:
                LeadersManager.inst.updateLeader(employee as Leader);
                break;
            case LoginStatus.Worker:
                WorkersManager.inst.updateWorker(employee as Worker);
                break;
            default:
                throw new UnreachableCaseError("Invalid login status");
        }

        Session.inst.setLoggedInAccount(employee);
    };

    const updateEmployeeCouldBeNull = (employee: Employee | null) => {
        if (employee != null) {
            updateEmployee(employee);
        }
    };

    // Pop ups
    let newFName = "";
    const onFNameChange = (name: string) => {
        newFName = name;
    };

    let newLName = "";
    const onLNameChange = (name: string) => {
        newLName = name;
    };
    const [editNameVisible, setEditNameVisible] = useState(false);
    const onNameDone = () => {
        setFName(newFName);
        setLName(newLName);
        setEditNameVisible(false);
        if (employee != null) {
            employee.setFirstName(newFName);
            employee.setLastName(newLName);
        }
        updateEmployeeCouldBeNull(employee);
    };

    let newEmail = "";
    const onEmailChange = (email: string) => {
        newEmail = email;
    };
    const [editEmailVisible, setEditEmailVisible] = useState(false);
    const onEmailDone = () => {
        setEmail(newEmail);
        setEditEmailVisible(false);
        if (employee != null) {
              employee.email = newEmail;
        }
        updateEmployeeCouldBeNull(employee);
    };

    const onCancel = () => {
        setEditNameVisible(false);
        setEditEmailVisible(false);
    };

    const typography = LeafTypography.textButton;
    typography.size = 15;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                padding: LeafDimensions.screenPadding,
                paddingTop: LeafDimensions.screenTopPadding,
            }}
        >
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                {/* Details */}
                <FlatContainer>
                    <LeafText typography={LeafTypography.title2.withWeight(LeafFontWeight.Bold)}>
                        {strings("label.details")}
                    </LeafText>

                    <VGap size={8} />

                    <HStack spacing={6} style={{ width: "100%", paddingBottom: 5, alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {fName} {lName}
                        </LeafText>

                        <Spacer />

                        <LeafTextButton
                            label={strings("button.edit").toUpperCase()}
                            typography={typography}
                            onPress={() => setEditNameVisible(true)}
                        />
                    </HStack>

                    <HStack spacing={6} style={{ width: "100%", alignItems: "center" }}>
                        <LeafText typography={LeafTypography.body} wide={false}>
                            {email}
                        </LeafText>

                        <Spacer />

                        <LeafTextButton
                            label={strings("button.edit").toUpperCase()}
                            typography={typography}
                            onPress={() => setEditEmailVisible(true)}
                        />
                    </HStack>
                </FlatContainer>

                <Spacer />

                <LeafButton label={strings("button.logout")} onPress={logOut} />
            </VStack>

            {/* Edit name */}
            <LeafPopUp
                visible={editNameVisible}
                setVisible={setEditNameVisible}
                title={strings("label.editName")}
                onDone={onNameDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.givenName")} onTextChange={onFNameChange} />
                <LeafTextInputShort label={strings("inputLabel.surname")} onTextChange={onLNameChange} />
            </LeafPopUp>

            {/* Edit email */}
            <LeafPopUp
                visible={editEmailVisible}
                setVisible={setEditEmailVisible}
                title={strings("label.editEmail")}
                onDone={onEmailDone}
                onCancel={onCancel}
            >
                <LeafTextInputShort label={strings("inputLabel.email")} onTextChange={onEmailChange} />
            </LeafPopUp>
        </View>
    );
};

export default AccountScreen;
