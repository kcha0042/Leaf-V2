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

interface Props {
    nurse: Nurse;
    style?: ViewStyle;
    onPress: () => void;
}

const ManageNurseScreen: React.FC<Props> = ({ nurse, style, onPress }) => {
    if (nurse == null) {
        return <LeafText typography={LeafTypography.body}>{strings("label.loading")}</LeafText>;
    }
    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.headerScreen}>{nurse.firstName + " " + nurse.lastName}</LeafText>

                <LeafText typography={LeafTypography.body}>
                    TODO: Nurse
                    {/* todo: role is not available in Employee atm, fix it later */}
                </LeafText>

                <LeafText typography={LeafTypography.body}>{strings("label.details")}</LeafText>

                <FloatingContainer color={LeafColors.textBackgroundLight} style={style} onPress={onPress}>
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