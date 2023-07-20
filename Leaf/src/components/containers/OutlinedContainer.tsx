import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import LeafColor from '../styling/color/LeafColor';
import Environment from '../../state/environment/Environment';
import { OS } from '../../state/environment/types/OS';
import LeafDimensions from '../styling/LeafDimensions';

interface Props {
    color: LeafColor;
    children; // No type - can be any component
    style?: ViewStyle;
}

const OutlinedContainer: React.FC<Props> = ({ 
    color,
    children,
    style,
}) => {
    return (
        <View 
            style={[
                styles.container,
                { borderColor: color.getColor() },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: LeafDimensions.fillRadius,
        padding: LeafDimensions.cardPadding,
        borderWidth: 4,
    }
});

export default OutlinedContainer;