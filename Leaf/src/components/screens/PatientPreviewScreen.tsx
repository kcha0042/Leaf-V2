import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
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
                <HStack>
                    <LeafIcon icon={"account"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> {strings("patientHistory.title.identity")} </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <VStack spacing={5}>
                        <LabeledText label={strings("patientHistory.descriptor.name")} text={patient.fullName} />
                        <LabeledText label={strings("patientHistory.descriptor.mrn")} text={patient.mrn.toString()} />
                        <LabeledText label={strings("patientHistory.descriptor.postcode")} text={patient.postCode} />
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"information"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> {strings("patientHistory.title.bio")} </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <VStack spacing={5}>
                        <LabeledText
                            label={strings("patientHistory.descriptor.dob")}
                            text={patient.dob.toDateString()}
                        />
                        <LabeledText label={strings("patientHistory.descriptor.sex")} text={patient.sex} />
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"file-document-edit"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> {strings("patientHistory.title.triage")} </LeafText>
                </HStack>
                <FlatContainer style={{ flex: 1, width: "100%" }}>
                    <VStack spacing={5}>
                        <LabeledText
                            label={strings("patientHistory.descriptor.code")}
                            text={patient.triageCase.triageCode.toString()}
                        >
                            <LeafText typography={LeafTypography.body}>{patient.triageCase.triageText}</LeafText>
                        </LabeledText>

                        <Spacer />

                        <View>
                            <LabeledText
                                label={strings("patientHistory.descriptor.arrivalDate")}
                                text={patient.triageCase.arrivalDate.toDateString()}
                            />
                            <LabeledText
                                label={strings("patientHistory.descriptor.arrivalWard")}
                                text={patient.triageCase.arrivalWard.name}
                            />
                        </View>

                        <View>
                            <LabeledText
                                label={strings("patientHistory.descriptor.dischargeDate")}
                                text={patient.triageCase.dischargeDate?.toDateString() || "-"}
                            />
                            <LabeledText
                                label={strings("patientHistory.descriptor.dischargeWard")}
                                text={patient.triageCase.dischargeWard?.name || "-"}
                            />
                        </View>

                        <Spacer />

                        <View>
                            <LabeledText
                                label={strings("patientHistory.descriptor.hospital")}
                                text={patient.triageCase.hospital.name}
                            />
                            <LabeledText
                                label={strings("patientHistory.descriptor.medicalUnit")}
                                text={patient.triageCase.medicalUnit.name}
                            />
                        </View>
                    </VStack>
                </FlatContainer>

                <HStack>
                    <LeafIcon icon={"clipboard-list"} size={iconSize} color={LeafColors.textDark} />
                    <LeafText wide={false}> {strings("patientHistory.title.events")} </LeafText>
                </HStack>
                {patient.events.map((event) => {
                    return (
                        <FlatContainer key={event.id.toString()} style={{ flex: 1, width: "100%" }}>
                            <VStack spacing={5}>
                                <LeafText typography={LeafTypography.title3}>{event.title}</LeafText>
                                <LeafText typography={LeafTypography.body}>{event.description}</LeafText>

                                <Spacer />

                                <View>
                                    <LeafText typography={LeafTypography.subscript}>
                                        {strings("patientHistory.descriptor.category")}
                                    </LeafText>
                                    <LeafText typography={LeafTypography.title4}>{event.category}</LeafText>
                                </View>
                                <View>
                                    <LeafText typography={LeafTypography.subscript}>
                                        {strings("patientHistory.descriptor.triggerTime")}
                                    </LeafText>
                                    <LeafText typography={LeafTypography.title4}>
                                        {event.triggerTime.toDateString() || ""}
                                    </LeafText>
                                </View>
                            </VStack>
                        </FlatContainer>
                    );
                })}
            </VStack>
        </DefaultScreenContainer>
    );
};

interface LabeledTextProps {
    label: string;
    text: string;
    children?: any;
}

const LabeledText: React.FC<LabeledTextProps> = ({ label, text, children }) => {
    return (
        <View>
            <LeafText typography={LeafTypography.subscript}>{label}</LeafText>
            <LeafText typography={LeafTypography.title4}>{text}</LeafText>
            {children}
        </View>
    );
};

export default PatientPreviewScreen;
