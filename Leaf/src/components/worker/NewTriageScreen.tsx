import { ScrollView, Spacer, VStack, View } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import { strings } from "../../localisation/Strings";
import LeafColors from "../core/styles/LeafColors";
import LeafTextInput from "../core/views/LeafTextInput/LeafTextInput";
import FormCard from "./components/FormCard";
import { SegmentedButtons } from "react-native-paper";
import LeafButton from "../core/views/LeafButton/LeafButton";
import { LeafButtonType } from "../core/views/LeafButton/LeafButtonType";

const NewTriageScreen: React.FC = () => {
    return (
        <ScrollView 
            flex={1}
            padding={LeafDimensions.screenPadding}
        >
            <VStack 
                flex={1}
                space={LeafDimensions.screenSpacing}
            >
                <LeafText typography={LeafTypography.header}>
                    {strings("header.newTriage")}
                </LeafText>

                <FormCard
                    icon="clipboard-account"
                    title={strings("triageForm.title.identity")}
                >
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
                </FormCard>

                <FormCard
                    icon="file-document-edit"
                    title={strings("triageForm.title.triage")}
                >
                    {/* Multiline Text */}
                    {/* For the following I should create a completely new wrapper over paper's button because then it doesn't have a dependency on button and I can set custom values such as height and whatever */}
                    <VStack>
                        <LeafButton
                            label="1: Immediate"
                            type={LeafButtonType.filled}
                            typography={LeafTypography.primaryButton}
                            color={LeafColors.accent}
                            onPress={() => {}}
                            style={{
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                        />
                        <LeafButton
                            label="1: Immediate"
                            type={LeafButtonType.filled}
                            typography={LeafTypography.primaryButton}
                            color={LeafColors.textDark}
                            onPress={() => {}}
                            style={{
                                borderRadius: 0
                            }}
                        />
                        <LeafButton
                            label="1: Immediate"
                            type={LeafButtonType.filled}
                            typography={LeafTypography.primaryButton}
                            color={LeafColors.accent}
                            onPress={() => {}}
                            style={{
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}
                        />
                    </VStack>
                </FormCard>

                <Spacer />
            </VStack>
        </ScrollView>
    );
}

export default NewTriageScreen;