import React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
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