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

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewAccountScreen: React.FC<Props> = ({ navigation }) => {
    const [hasCreate, setHasCreate] = React.useState(false);
    const [pickerErrVisible, setPickerErrVisible] = useState(false);
    const [errTextVisible, setErrTextVisible] = useState(false);
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

    return (
        <DefaultScreenContainer>
            <VStack>
                <HStack spacing={6} style={{ width: "100%", alignItems: "center", paddingBottom: 14 }}>
                    <LeafIcon icon={"clipboard-account"} color={LeafColors.textDark} size={LeafIconSize.Small} />

                    <LeafText typography={LeafTypography.title4} wide={false}>
                        {strings("label.selectRole")}
                    </LeafText>
                </HStack>

                <RolePicker onSelection={onRoleChange} />

                <LeafText
                    style={{ color: pickerErrVisible ? LeafTypography.error.color : "transparent", paddingTop: 10 }}
                    typography={LeafTypography.error}
                >
                    {strings("error.missingRole")}
                </LeafText>

                <VGap size={32} />

                <HStack spacing={6} style={{ width: "100%", alignItems: "center", paddingBottom: 14 }}>
                    <LeafIcon icon={"rename-box"} color={LeafColors.textDark} size={LeafIconSize.Small} />

                    <LeafText typography={LeafTypography.title4} wide={false}>
                        {strings("label.enterName")}
                    </LeafText>
                </HStack>

                <VStack spacing={8} style={{ width: "100%" }}>
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

                    <LeafText
                        style={{ color: errTextVisible ? LeafTypography.error.color : "transparent", paddingTop: 10 }}
                        typography={LeafTypography.error}
                    >
                        {strings("error.missingName")}
                    </LeafText>
                </VStack>

                <VGap size={32} />

                <LeafButton
                    label={strings("button.createAccount")}
                    icon="account-plus"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    onPress={() => {
                        if (name != "" && surname != "" && role != null) {
                            setHasCreate(true);
                        }

                        if (name == "" || surname == "") {
                            setErrTextVisible(true);
                        } else {
                            setErrTextVisible(false);
                        }

                        if (role == null) {
                            setPickerErrVisible(true);
                        } else {
                            setPickerErrVisible(false);
                        }

                        // TODO: should change to create account method later.
                    }}
                />

                <VGap size={32} />

                <CreateAccountCard
                    // TODO: Remove temp
                    worker={new Worker(EmployeeID.generate(), "Jason", "ANY", "temp", Hospitals["H1"], [])}
                    onPress={() => {}}
                    display={hasCreate}
                />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default NewAccountScreen;
