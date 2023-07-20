import React from "react";
import LeafText from "../base/LeafText/LeafText";
import LeafTypography from "../styling/LeafTypography";
import { ScrollView, View } from "react-native";
import LeafColors from "../styling/LeafColors";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
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