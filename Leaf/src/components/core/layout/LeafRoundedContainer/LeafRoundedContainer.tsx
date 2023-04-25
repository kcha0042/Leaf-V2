import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, TextStyle, View } from 'react-native';
import LeafTypographyConfig from '../../styles/typography/LeafTypographyConfig';
import LeafColor from '../../styles/color/LeafColor';

interface Props {
    color: LeafColor;
    children; // No type - can be any component
}

const LeafRoundedContainer: React.FC<Props> = ({ 
    color,
    children,
}) => {
    return (
        <View 
            style={[
                styles.container,
                { backgroundColor: color.getColor() }
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 24,
    }
});

export default LeafRoundedContainer;