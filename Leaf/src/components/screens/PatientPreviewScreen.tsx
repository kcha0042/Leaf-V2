import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientPreviewScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafText typography={LeafTypography.body}>TODO: Patient Preview</LeafText>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientPreviewScreen;
