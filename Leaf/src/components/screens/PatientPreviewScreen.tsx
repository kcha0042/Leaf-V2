import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import LeafText from "../base/LeafText/LeafText";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientPreviewScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View
            style={{
                backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: LeafDimensions.screenTopPadding,
                    paddingHorizontal: LeafDimensions.screenPadding,
                }}
            >
                <VStack
                    spacing={LeafDimensions.screenSpacing}
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.body}>TODO: Patient Preview</LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
};

export default PatientPreviewScreen;
