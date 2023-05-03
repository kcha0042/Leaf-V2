import { HStack, ScrollView, Spacer, VStack, View } from "native-base";
import React from "react";
import LeafText from "../core/views/LeafText/LeafText";
import LeafTypography from "../core/styles/LeafTypography";
import LeafDimensions from "../core/styles/LeafDimensions";
import { strings } from "../../localisation/Strings";
import LeafFloatingCard from "../core/containers/LeafFloatingCard/LeafFloatingCard";
import LeafColors from "../core/styles/LeafColors";
import LeafTextInput from "../core/views/LeafTextInput/LeafTextInput";
import LeafIcon from "../core/views/LeafIcon/LeafIcon";
import { LeafIconSize } from "../core/views/LeafIcon/LeafIconSize";

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

                <LeafFloatingCard 
                    color={LeafColors.textBackgroundLight}
                >
                    <VStack space={1.5}>
                        <HStack space={1}>
                            <LeafIcon 
                                icon={"clipboard-account"}
                                color={LeafColors.textDark}
                                size={LeafIconSize.formCardTitle}
                            />

                            <LeafText
                                typography={LeafTypography.formCardTitle} 
                                wide={false}
                            >
                                {strings("triageForm.title.identity")}
                            </LeafText>
                        </HStack>

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
                    </VStack>
                </LeafFloatingCard>

                <Spacer />
            </VStack>
        </ScrollView>
    );
}

export default NewTriageScreen;