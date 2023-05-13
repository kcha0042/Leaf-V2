import { ScrollView, Spacer, VStack } from "native-base";
import React, { useEffect } from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";
import Patient from "../../model/patient/Patient";
import { FlatList } from "native-base";
import PatientCard from "./components/PatientCard";
import { strings } from "../../localisation/Strings";
import { View } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import { useNavigation } from "@react-navigation/native";
import { PatientsNavigationProp } from "./navigation/Params";

interface Props {
    navigation?: PatientsNavigationProp;
}

const PatientsScreen: React.FC<Props> = ({ navigation }) => {
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
                        TODO: Patients Screen
                    </LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
}

export default PatientsScreen;