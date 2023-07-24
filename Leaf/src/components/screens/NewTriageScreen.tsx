import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { strings } from "../../localisation/Strings";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import LeafText from "../base/LeafText/LeafText";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import HStack from "../containers/HStack";
import VStack from "../containers/VStack";
import VGap from "../containers/layout/VGap";
import TriageCodePicker from "../custom/TriageCodePicker";
import LeafColors from "../styling/LeafColors";
import LeafTypography from "../styling/LeafTypography";
import DefaultScreenContainer from "./containers/DefaultScreenContainer";

interface Props {
    navigation?: NavigationProp<ParamListBase>;
}

const NewTriageScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <DefaultScreenContainer>
            <VStack>
                <HStack spacing={6} style={{ width: "100%", alignItems: "center", paddingBottom: 14 }}>
                    <LeafIcon icon={"clipboard-account"} color={LeafColors.textDark} size={LeafIconSize.Small} />

                    <LeafText typography={LeafTypography.title4} wide={false}>
                        {strings("triageForm.title.identity")}
                    </LeafText>
                </HStack>

                <VStack spacing={8} style={{ width: "100%" }}>
                    <LeafTextInput
                        label={strings("triageForm.textInput.givenName")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafTextInput
                        label={strings("triageForm.textInput.surname")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafTextInput
                        label={strings("triageForm.textInput.mrn")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />

                    <LeafTextInput
                        label={strings("triageForm.textInput.postcode")}
                        textColor={LeafColors.textDark}
                        color={LeafColors.textBackgroundDark}
                        onTextChange={() => {}}
                    />
                </VStack>

                <VGap size={32} />

                <HStack spacing={6} style={{ width: "100%", alignItems: "center", paddingBottom: 14 }}>
                    <LeafIcon icon={"file-document-edit"} color={LeafColors.textDark} size={LeafIconSize.Small} />

                    <LeafText typography={LeafTypography.title4} wide={false}>
                        {strings("triageForm.title.triage")}
                    </LeafText>
                </HStack>

                <TriageCodePicker onSelection={(code) => {}} />
            </VStack>
        </DefaultScreenContainer>
    );
};

export default NewTriageScreen;
