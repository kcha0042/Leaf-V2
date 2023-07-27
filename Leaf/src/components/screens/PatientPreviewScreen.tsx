import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
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
                        <LeafText typography={LeafTypography.title4}> Name: {patient.fullName} </LeafText>
                        <LeafText typography={LeafTypography.title4}> MRN: {patient.mrn.toString()} </LeafText>
                        <LeafText typography={LeafTypography.title4}> Postcode: {patient.postCode} </LeafText>
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"information"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Bio </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <VStack spacing={5}>
                        <LeafText typography={LeafTypography.title4}> DOB: {patient.dob.toDateString()} </LeafText>
                        <LeafText typography={LeafTypography.title4}> Sex: A lot (TODO) </LeafText>
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"file-document-edit"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> Triage case </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    {/* TODO: this looks kinda gross, fix */}
                    <VStack spacing={5}>
                        <LeafText typography={LeafTypography.title3}> Code: {patient.triageCase.triageCode} </LeafText>
                        <LeafText typography={LeafTypography.body}> {patient.triageCase.triageText} </LeafText>

                        <Spacer />

                        <LeafText typography={LeafTypography.title4}>
                            {" "}
                            Arrival date: {patient.triageCase.arrivalDate.toDateString()}{" "}
                        </LeafText>
                        <LeafText typography={LeafTypography.title4}>
                            {" "}
                            Discharge date:{" "}
                            {patient.triageCase.dischargeDate?.toDateString() || "Has not been discharged"}{" "}
                        </LeafText>

                        <Spacer />

                        <LeafText typography={LeafTypography.title4}>
                            {" "}
                            Arrival ward: {patient.triageCase.arrivalWard.name}{" "}
                        </LeafText>
                        <LeafText typography={LeafTypography.title4}>
                            {" "}
                            Discharge ward: {patient.triageCase.dischargeWard?.name || "Has not been discharged"}{" "}
                        </LeafText>
                        <LeafText typography={LeafTypography.title4}>
                            {" "}
                            Hospital: {patient.triageCase.hospital.name}{" "}
                        </LeafText>
                        <LeafText typography={LeafTypography.title4}>
                            {" "}
                            Medical unit: {patient.triageCase.medicalUnit.name}{" "}
                        </LeafText>
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
                                <LeafText typography={LeafTypography.title3}> {event.title} </LeafText>
                                <LeafText typography={LeafTypography.body}> {event.description} </LeafText>

                                <Spacer />

                                <LeafText typography={LeafTypography.title4}> Category: {event.category} </LeafText>
                                <LeafText typography={LeafTypography.title4}>
                                    {" "}
                                    Trigger time: {event.triggerTime.toDateString()}{" "}
                                </LeafText>
                            </VStack>
                        </FlatContainer>
                    );
                })}
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientPreviewScreen;
