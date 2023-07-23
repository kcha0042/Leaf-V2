import React from "react";
import { ScrollView, View } from "react-native";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafText from "../base/LeafText/LeafText";
import ActionsScreen from "./ActionsScreen";
import VStack from "../containers/VStack";
import LeafDimensions from "../styling/LeafDimensions";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
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
                    padding: LeafDimensions.screenPadding,
                }}
            >
                <VStack
                    spacing={LeafDimensions.screenSpacing}
                    style={{
                        flex: 1,
                    }}
                >
                    <LeafText typography={LeafTypography.body}>TODO: Patients Screen</LeafText>

                    <LeafButton
                        label={"Button"}
                        icon="arrow-right-circle"
                        typography={LeafTypography.button}
                        type={LeafButtonType.Filled}
                        color={LeafColors.accent}
                        onPress={() => {
                            NavigationSession.inst.navigateTo(ActionsScreen, navigation, "Actions Now");
                        }}
                    />
                </VStack>
            </ScrollView>
        </View>
    );
};

export default PatientsScreen;
