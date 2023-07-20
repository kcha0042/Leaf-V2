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
                        TODO: Patient Preview
                    </LeafText>
                </VStack>
            </ScrollView>
        </View>
    );
}

export default PatientPreviewScreen;