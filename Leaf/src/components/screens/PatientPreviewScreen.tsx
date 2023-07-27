import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Session from "../../model/Session";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import LeafText from "../base/LeafText/LeafText";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import Spacer from "../containers/layout/Spacer";
import VStack from "../containers/VStack";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const PatientPreviewScreen: React.FC<Props> = ({ navigation }) => {
    const iconSize = 30;
    const patient = Session.inst.getActivePatient();

    return (
        <DefaultScreenContainer>
            <VStack
                spacing={LeafDimensions.screenSpacing}
                style={{
                    flex: 1,
                }}
            >
                <LeafIcon icon={"clock"} size={iconSize} color={LeafColors.textDark} />
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <LeafText> TODO </LeafText>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"account"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Identity </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <VStack spacing={5}>
                        <View>
                            <LeafText typography={LeafTypography.subscript}>Name</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.fullName}</LeafText>
                        </View>
                        <View>
                            <LeafText typography={LeafTypography.subscript}>MRN</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.mrn.toString()}</LeafText>
                        </View>
                        <View>
                            <LeafText typography={LeafTypography.subscript}>Postcode</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.postCode}</LeafText>
                        </View>
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"information"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Bio </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <VStack spacing={5}>
                        <View>
                            <LeafText typography={LeafTypography.subscript}>DOB</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.dob.toDateString()}</LeafText>
                        </View>
                        <View>
                            <LeafText typography={LeafTypography.subscript}> Sex </LeafText>
                            <LeafText typography={LeafTypography.title4}>A lot (TODO)</LeafText>
                        </View>
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"file-document-edit"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Triage case </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    {/* TODO: this looks kinda gross, fix */}
                    <VStack spacing={5}>
                        <View>
                            <LeafText typography={LeafTypography.subscript}>Code</LeafText>
                            <LeafText typography={LeafTypography.title3}>{patient.triageCase.triageCode}</LeafText>
                            <LeafText typography={LeafTypography.body}>{patient.triageCase.triageText}</LeafText>
                        </View>

                        <Spacer />

                        <View>
                            <LeafText typography={LeafTypography.subscript}>Arrival date</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.triageCase.arrivalDate.toDateString() || ""}</LeafText>
                        </View>

                        <View>
                            <LeafText typography={LeafTypography.subscript}>Discharge date</LeafText>    
                            <LeafText typography={LeafTypography.title4}>{patient.triageCase.dischargeDate?.toDateString() || "Has not been discharged"}</LeafText>
                        </View>

                        <Spacer />

                        <View>
                            <LeafText typography={LeafTypography.subscript}>Arrival ward</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.triageCase.arrivalWard.name}</LeafText>
                        </View>

                        <View>
                            <LeafText typography={LeafTypography.subscript}>Discharge ward</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.triageCase.dischargeWard?.name || "Has not been discharged"}</LeafText>
                        </View>

                        <View>
                            <LeafText typography={LeafTypography.subscript}>Hospital</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.triageCase.hospital.name}</LeafText>
                        </View>

                        <View>
                            <LeafText typography={LeafTypography.subscript}>Medical unit</LeafText>
                            <LeafText typography={LeafTypography.title4}>{patient.triageCase.medicalUnit.name}</LeafText>
                        </View>
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"clipboard-list"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Events </LeafText>
                </HStack>
                {patient.events.map((event) => {
                    return (
                        <FlatContainer key={event.id.toString()} style={{ flex: 1, width: "100%" }}>
                            <VStack spacing={5}>
                                <LeafText typography={LeafTypography.title3}>{event.title}</LeafText>
                                <LeafText typography={LeafTypography.body}>{event.description}</LeafText>

                                <Spacer />

                                <View>
                                    <LeafText typography={LeafTypography.subscript}>Category</LeafText>    
                                    <LeafText typography={LeafTypography.title4}>{event.category}</LeafText>
                                </View>
                                <View>
                                    <LeafText typography={LeafTypography.subscript}>Trigger time</LeafText>
                                    <LeafText typography={LeafTypography.title4}>{event.triggerTime.toDateString() || ""}</LeafText>
                                </View>
                            </VStack>
                        </FlatContainer>
                    );
                })}
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientPreviewScreen;
