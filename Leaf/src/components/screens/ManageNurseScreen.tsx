import React from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import LeafDimensions from "../styling/LeafDimensions";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafColors from "../styling/LeafColors";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import { strings } from "../../localisation/Strings";
import Nurse from "../../model/employee/Worker";
import { View, ViewStyle } from "react-native";
import FloatingContainer from "../containers/FloatingContainer";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import VGap from "../containers/layout/VGap";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import EmployeeID from "../../model/employee/EmployeeID";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ManageNurseScreen: React.FC<Props> = ({ navigation }) => {
    const nurse = new Nurse(EmployeeID.generate(), "Jason", "Something");
    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.body}>
                    Nurse
                    {/* todo: role is not available in Employee atm, fix it later */}
                </LeafText>

                <LeafText typography={LeafTypography.body}>{strings("label.details")}</LeafText>

                <FloatingContainer color={LeafColors.textBackgroundLight}>
                    <VStack>
                        <View style={{ alignSelf: "flex-start" }}>
                            <LeafText typography={LeafTypography.title3} verticalWrap={true}>
                                {strings("label.id") + nurse.id.toString()}
                            </LeafText>
                        </View>

                        <VGap size={6} />

                        <LeafText typography={LeafTypography.subscript} wide={false}>
                            TODO: other information if we have - (temp text, fixed it later)
                        </LeafText>
                    </VStack>
                </FloatingContainer>

                <Spacer />

                <LeafButton
                    label={strings("button.deleteAccount")}
                    icon="delete"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.textError}
                    onPress={() => {
                        StateManager.loginStatus.publish(LoginStatus.LoggedOut); // should change to delete account method later.
                    }}
                />

                <LeafText typography={LeafTypography.subscript} wide={false}>
                    {strings("operation.removeAccount")}
                </LeafText>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default ManageNurseScreen;
