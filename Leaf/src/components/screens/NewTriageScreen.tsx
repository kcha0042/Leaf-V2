import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import { strings } from "../../localisation/Strings";
import LeafButton from "../base/LeafButton/LeafButton";
import { LeafButtonType } from "../base/LeafButton/LeafButtonType";
import LeafTextInput from "../base/LeafTextInput/LeafTextInput";
import VStack from "../containers/VStack";
import Spacer from "../containers/layout/Spacer";
import FormCard from "../custom/FormCard";
import LeafColors from "../styling/LeafColors";
import LeafDimensions from "../styling/LeafDimensions";
import LeafTypography from "../styling/LeafTypography";
import FlatContainer from "../containers/FlatContainer";
import HStack from "../containers/HStack";
import LeafIcon from "../base/LeafIcon/LeafIcon";
import LeafText from "../base/LeafText/LeafText";
import { LeafIconSize } from "../base/LeafIcon/LeafIconSize";
import VGap from "../containers/layout/VGap";
import LeafMultilineTextInput from "../base/LeafMultilineTextInput/LeafMultilineTextInput";
import LeafDatePicker from "../base/LeafDatePicker/LeafDatePicker";
import LeafSegmentedButtons from "../base/LeafSegmentedButtons/LeafSegmentedButtons";
import LeafSegmentedValue from "../base/LeafSegmentedButtons/LeafSegmentedValue";
import TriageCodePicker from "../custom/TriageCodePicker";
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
