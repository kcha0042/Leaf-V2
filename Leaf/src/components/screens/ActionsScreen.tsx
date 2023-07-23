import React from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import { ScrollView, View } from "react-native";
import LeafColors from "../styling/LeafColors";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const ActionsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.body}>TODO: Actions</LeafText>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default ActionsScreen;
