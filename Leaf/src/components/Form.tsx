import { VStack } from 'native-base';
import React from 'react';
import LeafTextInput from './core/views/LeafTextInput/LeafTextInput';
import LeafButton from './core/views/LeafButton/LeafButton';
import Session from '../model/Session';
import FormEntry from '../model/FormEntry';
import StateManager from '../state/StateManager';
import Environment from '../state/environment/Environment';
import { ScreenType } from '../state/environment/ScreenType';
import { LeafButtonType } from './core/views/LeafButton/LeafButtonType';
import LeafText from './core/views/LeafText/LeafText';
import LeafTypography from './core/styles/LeafTypography';
import LeafDimensions from './core/styles/LeafDimensions';
import LeafColors from './core/styles/LeafColors';

/**
 * THIS IS A DEMO COMPONENT
 */
const Form: React.FC = () => {
    const [text1, setText1] = React.useState("");
    const [text2, setText2] = React.useState("");

    return (
        <VStack space={LeafDimensions.screenSpacing}>
            <LeafText typography={LeafTypography.body}>
                {"Screen type detected: " + ScreenType.toString(Environment.instance.getScreenType())}
            </LeafText>

            <LeafTextInput 
                label={"Text 1"}
                onTextChange={(text) => {
                    setText1(text);
                }}
            />

            <LeafTextInput 
                label={"Text 2"}
                onTextChange={(text) => {
                    setText2(text);
                }}
            />

            <LeafButton 
                label="Submit"
                icon="send"
                typography={LeafTypography.primaryButton}
                type={LeafButtonType.filled} 
                color={LeafColors.primaryButton}
                onPress={() => {
                    let form = new FormEntry(text1, text2);
                    Session.instance.formEntry = form;
                    StateManager.formSubmitted.publish();
                }}
            />
        </VStack>
    );
}

export default Form;