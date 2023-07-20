import React from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import { View } from "react-native";
import LeafColors from "../styling/LeafColors";
import { PatientsNavigationProp } from "../navigation/Params";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { ScrollView } from "react-native-gesture-handler";

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
                style={{
                    flex: 1,
                    padding: LeafDimensions.screenPadding
                }}
            >
                <VStack 
                    spacing={LeafDimensions.screenSpacing}
                    style={{
                        flex: 1
                    }}
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