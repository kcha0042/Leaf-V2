import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { strings } from "../../localisation/Strings";
import { LeafPopUp } from "../base/LeafPopUp/LeafPopUp";
import Session from "../../model/session/Session";
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
import NavigationSession from "../navigation/state/NavigationEnvironment";
import { useNotificationSession } from "../base/LeafDropNotification/NotificationSession";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ManageLeaderScreen: React.FC<Props> = ({ navigation }) => {
    const leader = Session.inst.getActiveLeader();
    const [popUpVisible, setPopUpVisible] = React.useState(false);
    const { showErrorNotification, showSuccessNotification } = useNotificationSession();

    if (!leader) {
        return <ErrorScreen />;
    }

    const onDelete = async () => {
        setPopUpVisible(false);
        const success = await Session.inst.deleteLeader(leader);
        if (success) {
            Session.inst.fetchAllLeaders();
            NavigationSession.inst.navigateBack(navigation);
            showSuccessNotification(strings("feedback.successDeleteAccount"));
        } else {
            showErrorNotification(strings("feedback.accountNotExist"));
        }
    };

    const onCancel = () => {
        setPopUpVisible(false);
    };

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.title2.withWeight(LeafFontWeight.Bold)}>
                    {leader.role.toString()}
                </LeafText>

                <FlatContainer color={LeafColors.fillBackgroundLight}>
                    <LeafText typography={LeafTypography.body}>{strings("label.id") + leader.id.toString()}</LeafText>
                </FlatContainer>

                <VGap size={32} />

                <LeafPopUp
                    visible={popUpVisible}
                    setVisible={setPopUpVisible}
                    title={strings("actions.removeLeader") + ' "' + leader.fullName + '"'}
                    onCancel={onCancel}
                    onDone={onDelete}
                    doneLabel="Remove"
                >
                    <LeafText typography={LeafTypography.title4} wide={false}>
                        {strings("label.removeAccountWarning")}
                    </LeafText>
                </LeafPopUp>

                <LeafButton
                    label={strings("button.deleteAccount")}
                    icon="delete"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.textError}
                    onPress={() => setPopUpVisible(true)}
                />

                <LeafText typography={LeafTypography.subscript} wide={false}>
                    {strings("operation.removeAccount")}
                </LeafText>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default ManageLeaderScreen;
