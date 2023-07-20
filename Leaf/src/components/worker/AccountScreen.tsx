import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import { ScrollView, View } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import { PatientsNavigationProp } from "./navigation/Params";
import VStack from "../core/containers/VStack";
import LeafDimensions from "../core/styles/LeafDimensions";

interface Props {
    navigation?: PatientsNavigationProp;
}

const AccountScreen: React.FC<Props> = ({ navigation }) => {
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
                        TODO: Account Screen
                    </LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
}

export default AccountScreen;