import React from 'react';
import { Text } from 'react-native-paper';
import LeafTypographyConfig from '../../styles/typography/LeafTypographyConfig';
import { LeafPresetTypography } from '../../styles/presets/LeafPresetTypography';

interface Props {
    text: string;
    typography: LeafPresetTypography
}

const LeafText: React.FC<Props> = ({ 
    text, 
    typography,
}) => {
    return (
        <Text
            style={[
                LeafPresetTypography.getStyle(typography),
            ]}
        >
            {text}
        </Text>
    );
}

export default LeafText;