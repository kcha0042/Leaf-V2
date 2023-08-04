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
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import PatientsPicker from "../custom/PatientsPicker";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientsScreen: React.FC<Props> = ({ navigation }) => {
    const onSelection = () => {};

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                    backgroundColor: LeafColors.screenBackgroundLight.getColor(),
                }}
            >
                <PatientsPicker onSelection={onSelection} />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientsScreen;
