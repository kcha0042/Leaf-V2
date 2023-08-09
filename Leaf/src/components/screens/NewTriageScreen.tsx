import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useState } from "react";
import { strings } from "../../localisation/Strings";
import Hospital from "../../model/hospital/Hospital";
import MedicalUnit from "../../model/hospital/MedicalUnit";
import Ward from "../../model/hospital/Ward";
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
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import StateManager from "../../state/publishers/StateManager";
import LeafTypography from "../styling/LeafTypography";
import { MedicalUnitsArray } from "../../preset_data/MedicalUnits";
import { HospitalsArray } from "../../preset_data/Hospitals";
import { WardsArray } from "../../preset_data/Wards";
import { TriageCode } from "../../model/triage/TriageCode";
import ValidateUtil from "../../utils/ValidateUtil";
import Patient from "../../model/patient/Patient";
import MRN from "../../model/patient/MRN";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import { PatientSex } from "../../model/patient/PatientSex";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import TriageCase from "../../model/triage/TriageCase";
import Session from "../../model/session/Session";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewTriageScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedHosptial, setSelectedHospital] = useState<LeafSelectionItem<Hospital> | undefined>(undefined);
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
        return sex !== null && sex !== undefined;
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
        return triageCode !== null && triageCode !== undefined;
    };
    const triageDescriptionIsValid: () => boolean = () => {
        return ValidateUtil.stringIsValid(triageDescription);
    };
    const hospitalIsValid: () => boolean = () => {
        return selectedHosptial !== null && selectedHosptial !== undefined;
    };
    const wardIsValid: () => boolean = () => {
        return selectedWard !== null && selectedWard !== undefined;
    };
    const medicalUnitIsValid: () => boolean = () => {
        return selectedMedicalUnit !== null && selectedMedicalUnit !== undefined;
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
            const patient = Patient.new(
                new MRN(mrn),
                dob,
                givenName,
                surname,
                sex.value,
                phone,
                TriageCase.new(
                    selectedWard.value,
                    selectedHosptial.value,
                    selectedMedicalUnit.value,
                    triageDescription,
                    triageCode,
                ),
                postcode,
                Session.inst.loggedInAccount.id,
            );
            const successful = await Session.inst.submitTriage(patient);
            if (successful) {
                console.log("SUCCESS"); // TODO: Provide user feedback
                StateManager.clearAllInputs.publish();
            } else {
                console.log("FAILED"); // TODO: Provide user feedback
            }
        } else {
            console.log("INVALID INPUTS"); // TODO: Provide user feedback
        }
    };

    const formPadding = 24;

    return (
        <DefaultScreenContainer>
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
                        items={HospitalsArray.map((hospital) => {
                            return new LeafSelectionItem(hospital.name, hospital.code, hospital);
                        })}
                        title={strings("inputLabel.hopsital")}
                        selected={selectedHosptial}
                        onSelection={(item: LeafSelectionItem<Hospital>) => {
                            setSelectedHospital(item);
                        }}
                    />

                    <LeafSelectionInput
                        navigation={navigation}
                        items={WardsArray.map((ward) => {
                            return new LeafSelectionItem(ward.name, ward.hosptialCode, ward);
                        })}
                        title={strings("inputLabel.ward")}
                        selected={selectedWard}
                        onSelection={(item: LeafSelectionItem<Ward>) => {
                            setSelectedWard(item);
                        }}
                    />

                    <LeafSelectionInput
                        navigation={navigation}
                        items={MedicalUnitsArray.map((unit) => {
                            return new LeafSelectionItem(unit.name, unit.group, unit);
                        })}
                        title={strings("inputLabel.medicalUnit")}
                        selected={selectedMedicalUnit}
                        onSelection={(item: LeafSelectionItem<MedicalUnit>) => {
                            setSelectedMedicalUnit(item);
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
        </DefaultScreenContainer>
    );
};

export default NewTriageScreen;
