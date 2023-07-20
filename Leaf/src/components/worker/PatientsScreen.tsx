import React from "react";
import { ScrollView, View } from "react-native";
import NavigationEnvironment from "../core/navigation/navigators/NavigationEnvironment";
import LeafColors from "../core/styles/LeafColors";
import LeafTypography from "../core/styles/LeafTypography";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";
import LeafText from "../core/views/LeafText/LeafText";
import ActionsScreen from "./ActionsScreen";
import { PatientsNavigationProp } from "./navigation/Params";
import VStack from "../core/containers/VStack";
import LeafDimensions from "../core/styles/LeafDimensions";

interface Props {
    navigation?: PatientsNavigationProp;
}

const PatientsScreen: React.FC<Props> = ({ navigation }) => {
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
                        TODO: Patients Screen
                    </LeafText>

                    <LeafButton 
                        label={"Button"}
                        icon="arrow-right-circle"
                        typography={LeafTypography.primaryButton}
                        type={LeafButtonType.filled} 
                        color={LeafColors.accent}
                        onPress={() => { 
                            NavigationEnvironment.inst.navigationTo(ActionsScreen, navigation, "Actions Now"); 
                        }}
                    />
                </VStack>
            </ScrollView>
        </View>
    );
}

export default PatientsScreen;