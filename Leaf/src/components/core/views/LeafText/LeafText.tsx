import React from 'react';
import { Text } from 'react-native-paper';
import { TextStyle } from 'react-native';
import LeafTypographyConfig from '../../styles/typography/LeafTypographyConfig';

interface Props {
    children; // No type - can be any element (allows text element embedding)
    typography: LeafTypographyConfig;
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
                typography.getStylesheet(),
                style,
            ]}
        >
            {children}
        </Text>
    );
}

export default LeafText;