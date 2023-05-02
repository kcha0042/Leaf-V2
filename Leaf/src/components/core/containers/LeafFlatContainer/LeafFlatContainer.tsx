import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import LeafColor from '../../styles/color/LeafColor';

interface Props {
    color: LeafColor;
    onPress?: () => void | null;
    children; // No type - can be any component
    style?: ViewStyle;
}

const LeafFlatContainer: React.FC<Props> = ({ 
    color,
    onPress = null,
    children,
    style,
}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={onPress == null}>
            <View 
                style={[
                    styles.container,
                    { backgroundColor: color.getColor() },
                    style,
                ]}
            >
                {children}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 24,
    }
});

export default LeafFlatContainer;