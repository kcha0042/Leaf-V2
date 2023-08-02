import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { strings } from "../../localisation/Strings";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import FormHeader from "../custom/FormHeader";
import TriageCodePicker from "../custom/TriageCodePicker";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";
import LeafMultilineTextInput from "../base/LeafMultilineTextInput/LeafMultilineTextInput";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewTriageScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <DefaultScreenContainer>
            <VStack>
                <FormHeader
                    title={strings("triageForm.title.identity")}
                    icon="clipboard-account"
                    style={{ paddingBottom: 24 }}
                />

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
                </VStack>

                <FormHeader
                    title={strings("triageForm.title.triage")}
                    icon="file-document-edit"
                    style={{ paddingVertical: 24 }}
                />

                <VStack spacing={LeafDimensions.textInputSpacing} style={{ width: "100%" }}>
                    <TriageCodePicker onSelection={(code) => {}} style={{ paddingBottom: 8 }} />

                    <LeafMultilineTextInput label={strings("inputLabel.triageDescription")} onTextChange={() => {}} />
                </VStack>
            </VStack>
        </DefaultScreenContainer>
    );
};

export default NewTriageScreen;
