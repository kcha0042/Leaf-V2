import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
import { strings } from "../../localisation/Strings";
import Hospital from "../../model/hospital/Hospital";
import MedicalUnit from "../../model/hospital/MedicalUnit";
import Ward from "../../model/hospital/Ward";
import { HospitalArray } from "../../preset_data/Hospitals";
import LeafButton from "../base/LeafButton/LeafButton";
import LeafDateInput from "../base/LeafDateInput/LeafDateInput";
import LeafSelectionInput from "../base/LeafListSelection/LeafSelectionInput";
import LeafSelectionItem from "../base/LeafListSelection/LeafSelectionItem";
import LeafMultilineTextInput from "../base/LeafMultilineTextInput/LeafMultilineTextInput";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import FormHeader from "../custom/FormHeader";
import TriageCodePicker from "../custom/TriageCodePicker";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import StateManager from "../../state/publishers/StateManager";
import LeafTypography from "../styling/LeafTypography";
import { TriageCode } from "../../model/triage/TriageCode";
import ValidateUtil from "../../utils/ValidateUtil";
import Patient from "../../model/patient/Patient";
import MRN from "../../model/patient/MRN";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import { PatientSex } from "../../model/patient/PatientSex";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import TriageCase from "../../model/triage/TriageCase";
import Session from "../../model/session/Session";
import KeyboardAwareScreenContainer from "./containers/KeyboardAwareScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewTriageScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedHospital, setSelectedHospital] = useState<LeafSelectionItem<Hospital> | undefined>(undefined);
    const [selectedWard, setSelectedWard] = useState<LeafSelectionItem<Ward> | undefined>(undefined);
    const [selectedMedicalUnit, setSelectedMedicalUnit] = useState<LeafSelectionItem<MedicalUnit> | undefined>(
        undefined,
    );
    const [sex, setSex] = React.useState<LeafSegmentedValue | undefined>(undefined);
    const [givenName, setGivenName] = useState<string | undefined>(undefined);
    const [surname, setSurname] = useState<string | undefined>(undefined);
    const [mrn, setMRN] = useState<string | undefined>(undefined);
    const [postcode, setPostcode] = useState<string | undefined>(undefined);
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [dob, setDOB] = useState<Date | undefined>(undefined);
    const [triageCode, setTriageCode] = useState<TriageCode | undefined>(undefined);
    const [triageDescription, setTriageDescription] = useState<string | undefined>(undefined);

    const sexIsValid: () => boolean = () => {
        return ValidateUtil.valueIsDefined(sex);
    };
    const givenNameIsValid: () => boolean = () => {
        return ValidateUtil.stringIsValid(givenName);
    };
    const surnameNameIsValid: () => boolean = () => {
        return ValidateUtil.stringIsValid(surname);
    };
    const mrnIsValid: () => boolean = () => {
        return ValidateUtil.mrnIsValid(mrn);
    };
    const postcodeIsValid: () => boolean = () => {
        return ValidateUtil.postcodeIsValid(postcode);
    };
    const phoneIsValid: () => boolean = () => {
        return ValidateUtil.phoneNumberIsValid(phone);
    };
    const dobIsValid: () => boolean = () => {
        return ValidateUtil.dobIsValid(dob);
    };
    const triageCodeIsValid: () => boolean = () => {
        return ValidateUtil.valueIsDefined(triageCode);
    };
    const triageDescriptionIsValid: () => boolean = () => {
        return ValidateUtil.stringIsValid(triageDescription);
    };
    const hospitalIsValid: () => boolean = () => {
        return ValidateUtil.valueIsDefined(selectedHospital);
    };
    const wardIsValid: () => boolean = () => {
        return ValidateUtil.valueIsDefined(selectedWard);
    };
    const medicalUnitIsValid: () => boolean = () => {
        return ValidateUtil.valueIsDefined(selectedMedicalUnit);
    };

    const allIsValid: () => boolean = () => {
        return (
            sexIsValid() &&
            givenNameIsValid() &&
            surnameNameIsValid() &&
            mrnIsValid() &&
            postcodeIsValid() &&
            phoneIsValid() &&
            dobIsValid() &&
            triageCodeIsValid() &&
            triageDescriptionIsValid() &&
            hospitalIsValid() &&
            wardIsValid() &&
            medicalUnitIsValid()
        );
    };

    const onSubmit = async () => {
        if (allIsValid()) {
            // We force-unwrap everything because we assume everything is validated already
            // If allIsValid() is every removed, TAKE OUT THE FORCE UNWRAPS
            // Otherwise this WILL cause errors
            const patient = Patient.new(
                new MRN(mrn!),
                dob!,
                givenName!,
                surname!,
                sex!.value,
                phone!,
                TriageCase.new(
                    selectedWard!.value,
                    selectedHospital!.value,
                    selectedMedicalUnit!.value,
                    triageDescription!,
                    triageCode!,
                ),
                postcode!,
                Session.inst.loggedInAccount.id,
            );
            const successful = await Session.inst.submitTriage(patient);
            if (successful) {
                console.log("SUCCESS"); // TODO: Provide user feedback
                StateManager.clearAllInputs.publish();
                Session.inst.fetchPatient(patient.mrn);
            } else {
                console.log("FAILED"); // TODO: Provide user feedback
            }
        } else {
            console.log("INVALID INPUTS"); // TODO: Provide user feedback
        }
    };

    const formPadding = 24;

    return (
        <KeyboardAwareScreenContainer>
            <VStack>
                <FormHeader title={strings("triageForm.title.identity")} style={{ paddingBottom: formPadding }} />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <LeafTextInput
                        label={strings("inputLabel.givenName")}
                        textColor={givenNameIsValid() || !givenName ? LeafColors.textDark : LeafColors.textError}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setGivenName(text);
                        }}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.surname")}
                        textColor={surnameNameIsValid() || !surname ? LeafColors.textDark : LeafColors.textError}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setSurname(text);
                        }}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.mrn")}
                        textColor={mrnIsValid() || !mrn ? LeafColors.textDark : LeafColors.textError}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setMRN(text);
                        }}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.postcode")}
                        textColor={postcodeIsValid() || !postcode ? LeafColors.textDark : LeafColors.textError}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setPostcode(text);
                        }}
                    />

                    <LeafDateInput
                        label={strings("inputLabel.dob")}
                        textColor={dobIsValid() || !dob ? LeafColors.textDark : LeafColors.textError}
                        onChange={(date) => {
                            setDOB(date);
                        }}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.phone")}
                        textColor={phoneIsValid() || !phone ? LeafColors.textDark : LeafColors.textError}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={(text) => {
                            setPhone(text);
                        }}
                    />

                    <LeafSegmentedButtons
                        label={strings("inputLabel.sex")}
                        options={[
                            new LeafSegmentedValue(PatientSex.male, PatientSex.male.toString()),
                            new LeafSegmentedValue(PatientSex.female, PatientSex.female.toString()),
                            new LeafSegmentedValue(PatientSex.other, PatientSex.other.toString()),
                        ]}
                        value={sex}
                        onSetValue={(segmentedValue) => {
                            setSex(segmentedValue);
                        }}
                    />
                </VStack>

                <FormHeader title={strings("triageForm.title.triage")} style={{ paddingVertical: formPadding }} />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <TriageCodePicker
                        onSelection={(code) => {
                            setTriageCode(code);
                        }}
                        style={{ paddingBottom: 8 }}
                    />

                    <LeafMultilineTextInput
                        label={strings("inputLabel.triageDescription")}
                        onTextChange={(text) => {
                            setTriageDescription(text);
                        }}
                        textColor={
                            triageDescriptionIsValid() || !triageDescription
                                ? LeafColors.textDark
                                : LeafColors.textError
                        }
                    />
                </VStack>

                <FormHeader
                    title={strings("triageForm.title.hospitalisation")}
                    style={{ paddingVertical: formPadding }}
                />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <LeafSelectionInput
                        navigation={navigation}
                        items={HospitalArray.map((hospital) => {
                            return new LeafSelectionItem(hospital.name, hospital.code, hospital);
                        })}
                        title={strings("inputLabel.hospital")}
                        selected={selectedHospital}
                        onSelection={(item: LeafSelectionItem<unknown> | undefined) => {
                            setSelectedHospital(item as LeafSelectionItem<Hospital> | undefined);
                        }}
                    />

                    <LeafSelectionInput
                        navigation={navigation}
                        items={
                            selectedHospital == undefined
                                ? []
                                : selectedHospital.value.wards.map((ward) => {
                                      return new LeafSelectionItem(ward.name, ward.hospitalCode, ward);
                                  })
                        }
                        title={strings("inputLabel.ward")}
                        selected={selectedWard}
                        disabled={selectedHospital == undefined}
                        onSelection={(item: LeafSelectionItem<unknown> | undefined) => {
                            setSelectedWard(item as LeafSelectionItem<Ward> | undefined);
                        }}
                    />

                    <LeafSelectionInput
                        navigation={navigation}
                        items={
                            selectedHospital == undefined
                                ? []
                                : selectedHospital.value.medUnits.map((medUnit) => {
                                      return new LeafSelectionItem(medUnit.name, medUnit.group, medUnit);
                                  })
                        }
                        title={strings("inputLabel.medicalUnit")}
                        selected={selectedMedicalUnit}
                        disabled={selectedHospital == undefined}
                        onSelection={(item: LeafSelectionItem<unknown> | undefined) => {
                            setSelectedMedicalUnit(item as LeafSelectionItem<MedicalUnit> | undefined);
                        }}
                    />
                </VStack>

                <FormHeader title={strings("triageForm.title.end")} style={{ paddingVertical: formPadding }} />

                <HStack spacing={24}>
                    <LeafButton
                        label={strings("button.clear")}
                        wide={false}
                        onPress={() => {
                            StateManager.clearAllInputs.publish();
                        }}
                        style={{ flex: 1 }}
                        color={LeafColors.fillBackgroundLight}
                        typography={LeafTypography.button.withColor(LeafColors.textSemiDark)}
                    />

                    <LeafButton label={strings("button.submit")} wide={false} onPress={onSubmit} style={{ flex: 1 }} />
                </HStack>
            </VStack>
        </KeyboardAwareScreenContainer>
    );
};

export default NewTriageScreen;
