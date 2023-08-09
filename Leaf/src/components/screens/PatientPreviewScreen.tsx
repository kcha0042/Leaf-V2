import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { strings } from "../../localisation/Strings";
import Session from "../../model/session/Session";
import { TriageCode } from "../../model/triage/TriageCode";
import LeafText from "../base/LeafText/LeafText";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import LabeledText from "../custom/LabeledText";
import PatientInfoCard from "../custom/PatientInfoCard";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import { LeafFontWeight } from "../styling/typography/LeafFontWeight";
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
                spacing={LeafDimensions.cardSpacing}
                style={{
                    flex: 1,
                }}
            >
                <PatientInfoCard title={strings("patientHistory.title.identity")} icon="account">
                    <LabeledText label={strings("patientHistory.descriptor.name")} text={patient.fullName} />

                    <LabeledText label={strings("patientHistory.descriptor.mrn")} text={patient.mrn.toString()} />

                    <LabeledText label={strings("patientHistory.descriptor.postcode")} text={patient.postCode} />
                </PatientInfoCard>

                <PatientInfoCard title={strings("patientHistory.title.bio")} icon="run">
                    <LabeledText label={strings("patientHistory.descriptor.dob")} text={patient.dob.toDateString()} />

                    <LabeledText label={strings("patientHistory.descriptor.sex")} text={patient.sex.toString()} />
                </PatientInfoCard>

                <PatientInfoCard title={strings("patientHistory.title.triage")} icon="clipboard-account-outline">
                    <LabeledText
                        label={strings("patientHistory.descriptor.code")}
                        text={patient.triageCase.triageCode.toString()}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.triageText")}
                        text={patient.triageCase.triageText}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.arrivalDate")}
                        text={patient.triageCase.arrivalDate.toDateString()}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.arrivalWard")}
                        text={patient.triageCase.arrivalWard.name}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.dischargeDate")}
                        text={patient.triageCase.dischargeDate?.toDateString() || "-"}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.dischargeWard")}
                        text={patient.triageCase.dischargeWard?.name || "-"}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.hospital")}
                        text={patient.triageCase.hospital.name}
                    />

                    <LabeledText
                        label={strings("patientHistory.descriptor.medicalUnit")}
                        text={patient.triageCase.medicalUnit.name}
                    />
                </PatientInfoCard>

                <PatientInfoCard title={strings("patientHistory.title.events")} icon="calendar-clock" spacing={12}>
                    {patient.events.map((event) => {
                        return (
                            <HStack key={event.id.toString()} spacing={12}>
                                <View
                                    style={{
                                        backgroundColor: LeafColors.accent.getColor(),
                                        width: 10,
                                        borderRadius: 8,
                                    }}
                                />

                                <VStack>
                                    <LeafText typography={LeafTypography.body.withWeight(LeafFontWeight.Bold)}>
                                        {event.title}
                                    </LeafText>

                                    <LeafText typography={LeafTypography.subscript.withItalic(true)}>
                                        {event.description}
                                    </LeafText>

                                    <VGap size={16} />

                                    <VStack spacing={2}>
                                        <LeafText typography={LeafTypography.subscript}>
                                            {strings("patientHistory.descriptor.category") +
                                                " " +
                                                event.category.toString()}
                                        </LeafText>

                                        <LeafText typography={LeafTypography.subscript}>
                                            {event.triggerTime.toDateString() || "-"}
                                        </LeafText>
                                    </VStack>
                                </VStack>
                            </HStack>
                        );
                    })}
                </PatientInfoCard>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default PatientPreviewScreen;
