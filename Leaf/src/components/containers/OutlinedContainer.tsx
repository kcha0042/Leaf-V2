import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import LeafDimensions from "../styling/LeafDimensions";
import LeafColor from "../styling/color/LeafColor";

interface Props {
    color: LeafColor;
    children: any; // No type - can be any component
    style?: ViewStyle;
}

const OutlinedContainer: React.FC<Props> = ({ color, children, style }) => {
    return <View style={[styles.container, { borderColor: color.getColor() }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        borderRadius: LeafDimensions.fillRadius,
        borderWidth: 4,
        padding: LeafDimensions.cardPadding,
    },
});

export default OutlinedContainer;
