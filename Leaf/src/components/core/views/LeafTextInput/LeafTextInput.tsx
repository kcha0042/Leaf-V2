import React from 'react';
import { TextInput } from 'react-native-paper';
import { LeafTextInputType } from './LeafTetInputType';
import { ViewStyle } from 'react-native';

interface Props {
    label: string;
    type: LeafTextInputType;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafTextInput: React.FC<Props> = ({ 
    label, 
    type, 
    style,
    onTextChange,
}) => {
    const [text, setText] = React.useState("");

    return (
        <TextInput
            label={label}
            value={text}
            mode={type}
            style={style}
            onChangeText={text => {
                setText(text)
                onTextChange(text);
            }}
        />
    );
}

export default LeafTextInput;