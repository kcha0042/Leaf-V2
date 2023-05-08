import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import LeafColor from '../../styles/color/LeafColor';
import Environment from '../../../../state/environment/Environment';
import { OS } from '../../../../state/environment/types/OS';
import LeafDimensions from '../../styles/LeafDimensions';

interface Props {
    color: LeafColor;
    children; // No type - can be any component
    style?: ViewStyle;
}

const LeafOutlinedContainer: React.FC<Props> = ({ 
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
        borderRadius: 16,
        padding: LeafDimensions.cardPadding,
        borderWidth: 4,
    }
});

export default LeafOutlinedContainer;