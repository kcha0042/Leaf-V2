import { VStack } from 'native-base';
import React from 'react';
import LeafTextInput from './core/views/LeafTextInput/LeafTextInput';
import LeafButton from './core/views/LeafButton/LeafButton';
import Session from '../model/Session';
import FormEntry from '../model/FormEntry';
import StateManager from '../state/StateManager';
import {Text} from 'react-native';
import Environment from '../state/environment/Environment';
import { ScreenType } from '../state/environment/ScreenType';
import { LeafTextInputType } from './core/views/LeafTextInput/LeafTetInputType';
import { LeafButtonType } from './core/views/LeafButton/LeafButtonType';

/**
 * THIS IS A DEMO COMPONENT
 */

const Form: React.FC = () => {
    const [text1, setText1] = React.useState("");
    const [text2, setText2] = React.useState("");

    return (
        <VStack space={4} padding={4}>
            <Text>{"Screen type detected: " + ScreenType.toString(Environment.instance.getScreenType())}</Text>

            <LeafTextInput 
                label={"Text 1"}
                type={LeafTextInputType.outlined}
                onTextChange={(text) => {
                    setText1(text);
                }}
            />

            <LeafTextInput 
                label={"Text 2"}
                type={LeafTextInputType.outlined}
                onTextChange={(text) => {
                    setText2(text);
                }}
            />

            <LeafButton 
                label="Submit"
                icon="send"
                type={LeafButtonType.filled} 
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