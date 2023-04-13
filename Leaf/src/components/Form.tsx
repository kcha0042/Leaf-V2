import { VStack } from 'native-base';
import React from 'react';
import LeafTextInput, { LeafTextInputType } from './core/views/LeafTextInput/LeafTextInput';
import LeafButton, { LeafButtonType } from './core/views/LeafButton/LeafButton';
import Session from '../model/Session';
import FormEntry from '../model/FormEntry';
import StatePublisher, { newForm } from '../state/StatePublisher';

/**
 * THIS IS A DEMO COMPONENT
 */

const Form: React.FC = () => {
    const [text1, setText1] = React.useState("");
    const [text2, setText2] = React.useState("");

    return (
        <VStack space={4} paddingX={4}>
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
                    StatePublisher.formPublisher.dispatch(newForm());
                }}
            />
        </VStack>
    );
}

export default Form;