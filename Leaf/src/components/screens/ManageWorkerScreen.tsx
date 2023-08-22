import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import StateManager from "../../state/publishers/StateManager";
import { LoginStatus } from "../../state/publishers/types/LoginStatus";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import { ErrorScreen } from "./ErrorScreen";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ManageWorkerScreen: React.FC<Props> = ({ navigation }) => {
    const worker = Session.inst.getActiveWorker();

    if (!worker) {
        return <ErrorScreen />;
    }

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.title2.withWeight(LeafFontWeight.Bold)}>
                    {worker.role.toString()}
                </LeafText>

                <FlatContainer color={LeafColors.fillBackgroundLight}>
                    <LeafText typography={LeafTypography.body}>{strings("label.id") + worker.id.toString()}</LeafText>
                </FlatContainer>

                <VGap size={32} />

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

export default ManageWorkerScreen;
