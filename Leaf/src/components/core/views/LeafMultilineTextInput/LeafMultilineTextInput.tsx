import React from 'react';
import { TextInput } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import LeafColor from '../../styles/color/LeafColor';
import LeafColors from '../../styles/LeafColors';
import LeafTypography from '../../styles/LeafTypography';
import LeafText from '../LeafText/LeafText';
import useForceUpdate from 'use-force-update';
import VStack from '../../containers/VStack';

interface Props {
    label: string;
    textColor: LeafColor;
    color: LeafColor;
    wide?: boolean;
    style?: ViewStyle;
    onTextChange: (text: string) => void;
}

const LeafMultilineTextInput: React.FC<Props> = ({ 
    label, 
    textColor,
    color,
    wide = true,
    style,
    onTextChange,
}) => {
    const forceUpdate = useForceUpdate();

    const [text, setText] = React.useState("");

    // Input typography
    let typography = LeafTypography.body;

    // Label typography
    let labelTypography = LeafTypography.body;
    const [labelColor, setLabelColor] = React.useState(LeafColors.textInputDescription);

    const onFocus = () => {
        setLabelColor(textColor);
        forceUpdate();
    }

    const onUnfocus = () => {
        setLabelColor(LeafColors.textInputDescription);
        forceUpdate();
    }

    return (
        <VStack style={{ width: "100%" }}>
            <LeafText typography={labelTypography} style={{ color: labelColor.getColor() }}>
                {label}
            </LeafText>

            <TextInput
                label={""}
                value={text}
                mode="outlined"
                style={[
                    wide ? { width: "100%" } : { alignSelf: 'center' },
                    { borderRadius: 30 },
                    { backgroundColor: color.getColor() },
                    { height: 130 },
                    style,
                ]}
                contentStyle={{
                    ...typography.getStylesheet(),
                }}
                onFocus={onFocus}
                onBlur={onUnfocus}
                multiline={true}
                outlineColor={LeafColors.outlineTextBackgroundDark.getColor()} 
                theme={{ colors: { primary: textColor.getColor() } }}
                outlineStyle={{ borderRadius: 12 }}
                onChangeText={text => {
                    setText(text)
                    onTextChange(text);
                }}
            />
        </VStack>
    );
}

export default LeafMultilineTextInput;