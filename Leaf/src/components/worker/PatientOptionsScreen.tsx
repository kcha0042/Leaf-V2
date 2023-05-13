import { ScrollView, Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import { View } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import { PatientsNavigationProp } from "./navigation/Params";

interface Props {
    navigation?: PatientsNavigationProp;
}

const PatientOptionsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View 
            style={{
                backgroundColor: LeafColors.screenBackgroundLight.getColor(), 
                flex: 1
            }}
        >
            <ScrollView 
                flex={1}
                padding={LeafBaseDimensions.screenPadding}
            >
                <VStack 
                    flex={1}
                    space={LeafBaseDimensions.screenSpacing}
                >
                    <LeafText
                        typography={LeafTypography.body}
                    >
                        TODO: Patient Options
                    </LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
}

export default PatientOptionsScreen;