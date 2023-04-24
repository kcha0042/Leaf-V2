import React from 'react';
import { Text } from 'react-native-paper';
import { LeafPresetTypography } from '../../styles/presets/LeafPresetTypography';
import { TextStyle } from 'react-native';

interface Props {
    children; // No type - can be any element (allows text element embedding)
    typography: LeafPresetTypography;
    style?: TextStyle;
}

const LeafText: React.FC<Props> = ({ 
    children, 
    typography,
    style,
}) => {
    return (
        <Text
            style={[
                LeafPresetTypography.getStyle(typography),
                style,
            ]}
        >
            {children}
        </Text>
    );
}

export default LeafText;