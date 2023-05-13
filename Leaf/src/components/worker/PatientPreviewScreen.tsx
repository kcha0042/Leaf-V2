import { ScrollView, Spacer, VStack } from "native-base";
import React, { useEffect } from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafBaseDimensions from "../core/styles/LeafBaseDimensions";
import { View } from "react-native";
import LeafColors from "../core/styles/LeafColors";
import { PatientsNavigationProp } from "./navigation/Params";
import StateManager from "../../state/publishers/StateManager";
import Session from "../../model/Session";

interface Props {
    navigation?: PatientsNavigationProp;
}

const PatientPreviewScreen: React.FC<Props> = ({ navigation }) => {
    const matchHeaderToPatient = () => {
        let activePatient = Session.instance.getActivePatient();
        if (activePatient != null) {
            StateManager.headerTitleOverride.publish(activePatient.fullName);
        }
    }

    useEffect(() => {
        matchHeaderToPatient();
    }, []);

    StateManager.activePatientChanged.subscribe(() => {
        matchHeaderToPatient();
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Executed when a navigation event occurs
            // Reset header override
            StateManager.headerTitleOverride.publish(null);
        });
        return unsubscribe;
    }, [navigation]);
    
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
                        TODO: Patient Preview
                    </LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
}

export default PatientPreviewScreen;