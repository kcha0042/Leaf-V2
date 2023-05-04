import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import { Spacer, VStack, View } from "native-base";
import { strings } from "../../localisation/Strings";
import Nurse from "../../model/employee/Worker";
import { ViewStyle } from "react-native";
import LeafFloatingCard from "../core/containers/LeafFloatingCard/LeafFloatingCard";

interface Props {
    nurse: Nurse;
    style?: ViewStyle;
    onPress: () => void;
}

const ManageNurseScreen: React.FC<Props> = ({
    nurse,
    style,
    onPress,
}) => {
    console.log(nurse)
    if (nurse == null){
        return <LeafText typography={LeafTypography.body}>
            {strings("label.loading")}
            </LeafText>
    }
    return (
        <View
            flex={1}
            padding={LeafDimensions.screenPadding}
        >
            <VStack
                flex={1}
                space={LeafDimensions.screenSpacing}
            >
                <LeafText typography={LeafTypography.header}>
                    {nurse.firstName}
                </LeafText>

                <LeafText typography={LeafTypography.body}>
                    nurse
                    {/* todo: role is not available in Employee atm, fix it later */}
                </LeafText>

                <LeafText typography={LeafTypography.body}>
                    Details
                </LeafText>

                <LeafFloatingCard
                    color={LeafColors.textBackgroundLight}
                    style={style}
                    onPress={onPress}
                >
                    <VStack>
                        <View alignSelf={'flex-start'}>
                            <LeafText
                                typography={LeafTypography.cardTitle}
                                verticalWrap={true}
                            >
                                {strings("label.id") + nurse.id.toString()}
                            </LeafText>
                        </View>

                        <Spacer size={3} />

                        <LeafText
                            typography={LeafTypography.subscript}
                            wide={false}
                        >
                            other information if we have - (temp text, fixed it later)
                            {/* TEMP Text */}
                        </LeafText>
                    </VStack>
                </LeafFloatingCard>

                <Spacer />

                <LeafButton
                    label="Remove Account"
                    icon="delete"
                    typography={LeafTypography.primaryButton}
                    type={LeafButtonType.filled}
                    color={LeafColors.textError}
                    onPress={() => {
                        StateManager.loginStatus.publish(LoginStatus.loggedOut); // should change to delete account method later.
                    }}
                />

                <LeafText
                    typography={LeafTypography.subscript}
                    wide={false}
                >
                    {strings("operation.removeAccount")}
                </LeafText>
            </VStack>
        </View>


    );
}

export default ManageNurseScreen;