import React from 'react';
import { TextInput } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import LeafColor from '../../styling/color/LeafColor';
import LeafColors from '../../styling/LeafColors';
import LeafTypography from '../../styling/LeafTypography';

interface Props {
    label: string;
    textColor?: LeafColor;
    color?: LeafColor;
    wide?: boolean;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafTextInput: React.FC<Props> = ({ 
    label, 
    textColor = LeafColors.textDark,
    color = LeafColors.textBackgroundDark,
    wide = true,
    style,
    onTextChange,
}) => {
    const [text, setText] = React.useState("");
    let typography = LeafTypography.body;

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
            contentStyle={{
                ...typography.getStylesheet(),
            }}
            outlineColor={LeafColors.outlineTextBackgroundDark.getColor()} 
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