import { Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafColors from "../core/styles/LeafColors";
import StateManager from "../../state/StateManager";
import { LoginStatus } from "../../state/LoginStatus";

const WorkerScreen: React.FC = () => {
    return (
        <VStack style={{ flex: 1 }} space={LeafDimensions.screenSpacing}>
            <Spacer/>

            <LeafText
                typography={LeafTypography.body}
                style={{ textAlign: 'center' }}
            >
                TODO: Worker Screen
            </LeafText>

            <LeafButton 
                label="Logout (TEMP)"
                icon="arrow-left-circle"
                typography={LeafTypography.primaryButton}
                type={LeafButtonType.filled} 
                color={LeafColors.accent}
                onPress={() => {
                    StateManager.loginStatus.publish(LoginStatus.loggedOut);
                }}
            />

            <Spacer />
        </VStack>
    );
}

export default WorkerScreen;