import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientPreviewScreen: React.FC<Props> = ({ navigation }) => {
    const iconSize = 30;

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafIcon icon={"clock-outline"} size={iconSize} color={LeafColors.textDark} />
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <LeafText> TODO </LeafText>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"account"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Identity </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}></FlatContainer>

                <HStack>
                    <LeafIcon icon={"information-outline"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Bio </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}></FlatContainer>

                <HStack>
                    <LeafIcon icon={"file-document-edit"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Triage </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}></FlatContainer>

                <HStack>
                    <LeafIcon icon={"clipboard-list-outline"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Events </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}></FlatContainer>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientPreviewScreen;
