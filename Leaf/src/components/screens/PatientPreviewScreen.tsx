import React, { useEffect } from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import { ScrollView, View } from "react-native";
import LeafColors from "../styling/LeafColors";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import LeafDimensions from "../styling/LeafDimensions";
import VStack from "../containers/VStack";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

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
                    padding: LeafDimensions.screenPadding,
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
