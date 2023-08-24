import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import LeafColor from "../../styling/color/LeafColor";

interface Props {
    color: LeafColor;
    onPress?: () => void;
    children: any; // No type - can be any component
    style?: ViewStyle;
}

const LeafChip: React.FC<Props> = ({ color, onPress = null, children, style }) => {
    // Touchable opacity stops the highlighting of text - remove it if it's not a button
    return onPress == null ? (
        <View style={[styles.container, { backgroundColor: color.getColor() }, style]}>{children}</View>
    ) : (
        <TouchableOpacity onPress={onPress} disabled={onPress == null}>
            <View style={[styles.container, { backgroundColor: color.getColor() }, style]}>{children}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: "flex-start",
    },
});

export default LeafChip;
