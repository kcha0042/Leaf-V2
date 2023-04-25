import React from 'react';
import { TextInput } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import LeafColors from '../../styles/LeafColors';

interface Props {
    label: string;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafTextInput: React.FC<Props> = ({ 
    label, 
    style,
    onTextChange,
}) => {
    const [text, setText] = React.useState("");

    return (
        <TextInput
            label={label}
            value={text}
            mode="outlined"
            style={[
                style,
                { borderRadius: 30 },
            ]}
            outlineColor="transparent" 
            theme={{ colors: { primary: LeafColors.textDark.getColor() } }}
            outlineStyle={{ borderRadius: 12 }}
            onChangeText={text => {
                setText(text)
                onTextChange(text);
            }}
        />
    );
}

export default LeafTextInput;