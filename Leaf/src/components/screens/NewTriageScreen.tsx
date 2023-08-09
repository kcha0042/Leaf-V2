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

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewTriageScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedHosptial, setSelectedHospital] = useState<LeafSelectionItem<Hospital> | undefined>(undefined);
    const [selectedWard, setSelectedWard] = useState<LeafSelectionItem<Ward> | undefined>(undefined);
    const [selectedMedicalUnit, setSelectedMedicalUnit] = useState<LeafSelectionItem<MedicalUnit> | undefined>(
        undefined,
    );

    const formPadding = 24;

    return (
        <DefaultScreenContainer>
            <VStack>
                <FormHeader title={strings("triageForm.title.identity")} style={{ paddingBottom: formPadding }} />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <LeafTextInput
                        label={strings("inputLabel.givenName")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.surname")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.mrn")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafTextInput
                        label={strings("inputLabel.postcode")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafDateInput
                        label={strings("inputLabel.dob")}
                        onChange={(date) => console.log(date?.toDateString())}
                    />
                </VStack>

                <FormHeader title={strings("triageForm.title.triage")} style={{ paddingVertical: formPadding }} />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <TriageCodePicker onSelection={(code) => {}} style={{ paddingBottom: 8 }} />

                    <LeafMultilineTextInput label={strings("inputLabel.triageDescription")} onTextChange={() => {}} />
                </VStack>

                <FormHeader
                    title={strings("triageForm.title.hospitalisation")}
                    style={{ paddingVertical: formPadding }}
                />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <LeafSelectionInput
                        navigation={navigation}
                        // TODO: Replace with actual hospitals
                        items={[
                            new LeafSelectionItem("Red Hospital", "RED", 1),
                            new LeafSelectionItem("Blue Hospital", "BLUE", 2),
                        ]}
                        title={strings("inputLabel.hopsital")}
                        selected={selectedHosptial}
                        onSelection={(item: LeafSelectionItem<Hospital>) => {
                            setSelectedHospital(item);
                        }}
                    />

                    <LeafSelectionInput
                        navigation={navigation}
                        // TODO: Replace with actual wards
                        items={[
                            new LeafSelectionItem("Red Ward", "RED", 1),
                            new LeafSelectionItem("Blue Ward", "BLUE", 2),
                        ]}
                        title={strings("inputLabel.ward")}
                        selected={selectedWard}
                        onSelection={(item: LeafSelectionItem<Ward>) => {
                            setSelectedWard(item);
                        }}
                    />

                    <LeafSelectionInput
                        navigation={navigation}
                        // TODO: Replace with actual medical units
                        items={[
                            new LeafSelectionItem("Red Medical Unit", "RED", 1),
                            new LeafSelectionItem("Blue Medical Unit", "BLUE", 2),
                        ]}
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

                    <LeafButton
                        label={strings("button.submit")}
                        wide={false}
                        onPress={() => {
                            // TODO: Submit patient
                            // Then, go back via navigation
                        }}
                        style={{ flex: 1 }}
                    />
                </HStack>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default NewTriageScreen;
