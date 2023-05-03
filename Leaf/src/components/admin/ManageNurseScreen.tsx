import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import { HStack, Spacer, VStack, View } from "native-base";
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
                    {/* {nurse.firstName + " " + nurse.lastName} */}
                    Nurse Name
                    {/* fix by get the information dynamically */}
                </LeafText>

                <LeafText typography={LeafTypography.body}>
                    Nurse
                    {/* fix by get the information dynamically */}
                </LeafText>

                <LeafText typography={LeafTypography.body}>
                    {/* {nurse.firstName + " " + nurse.lastName} */}
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
                                ID: 12345678
                                {/* fix by get the information dynamically */}
                            </LeafText>
                        </View>

                        <Spacer size={3} />

                        <LeafText
                            typography={LeafTypography.subscript}
                            wide={false}
                        >
                            other information if we have
                            {/* fix by get the information dynamically */}
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
                        StateManager.loginStatus.publish(LoginStatus.loggedOut);
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