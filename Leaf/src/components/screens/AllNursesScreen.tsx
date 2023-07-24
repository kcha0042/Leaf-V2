import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import ManageNurseScreen from "./ManageNurseScreen";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const AllNursesScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.body}>TODO: All Nurses</LeafText>

                <LeafButton
                    label={"Button"}
                    icon="arrow-right-circle"
                    typography={LeafTypography.button}
                    type={LeafButtonType.Filled}
                    color={LeafColors.accent}
                    onPress={() => {
                        NavigationSession.inst.navigateTo(ManageNurseScreen, navigation, "TODO: ManageNurseScreen");
                    }}
                />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default AllNursesScreen;
