import React from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import { ScrollView, View } from "react-native";
import LeafColors from "../styling/LeafColors";
import { PatientsNavigationProp } from "../navigation/Params";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";

interface Props {
    navigation?: PatientsNavigationProp;
}

const ActionsScreen: React.FC<Props> = ({ navigation }) => {
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
                        TODO: Actions
                    </LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
}

export default ActionsScreen;