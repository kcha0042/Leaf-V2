import React from 'react';
import { TextInput } from 'react-native-paper';

interface Props {
    label: string;
    type: LeafTextInputType;
    onTextChange: (text: string) => void;
}

export enum LeafTextInputType {
    flat = "flat",
    outlined = "outlined"
}

const LeafTextInput: React.FC<Props> = ({ label, type, onTextChange }) => {
    const [text, setText] = React.useState("");

    return (
        <TextInput
            label={label}
            value={text}
            mode={type}
            onChangeText={text => {
                setText(text)
                onTextChange(text);
            }}
        />
    );
}

export default LeafTextInput;