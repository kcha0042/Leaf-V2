import React from 'react';
import { TextInput } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import LeafColor from '../../styles/color/LeafColor';

interface Props {
    label: string;
    textColor: LeafColor;
    color: LeafColor;
    wide?: boolean;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafTextInput: React.FC<Props> = ({ 
    label, 
    textColor,
    color,
    wide = true,
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
                wide ? { width: "100%" } : { alignSelf: 'center' },
                { borderRadius: 30 },
                { backgroundColor: color.getColor() },
                style,
            ]}
            outlineColor="transparent" 
            theme={{ colors: { primary: textColor.getColor() } }}
            outlineStyle={{ borderRadius: 12 }}
            onChangeText={text => {
                setText(text)
                onTextChange(text);
            }}
        />
    );
}

export default LeafTextInput;