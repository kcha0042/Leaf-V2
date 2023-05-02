import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import LeafColor from '../../styles/color/LeafColor';

interface Props {
    color: LeafColor;
    children; // No type - can be any component
    style?: ViewStyle;
}

const LeafFlatContainer: React.FC<Props> = ({ 
    color,
    children,
    style,
}) => {
    return (
        <View 
            style={[
                styles.container,
                { backgroundColor: color.getColor() },
                style,
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

export default LeafFlatContainer;