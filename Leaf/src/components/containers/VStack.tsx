import PropTypes from "prop-types";
import React from "react";
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
    children: any;
    spacing?: number;
    horizontalSpacing?: number;
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: ViewStyle;
}

const VStack: React.FC<Props> = ({ children, spacing = 0, horizontalSpacing = null, onLayout, style }) => {
    return (
        <View
            onLayout={onLayout}
            style={[
                styles.container,
                {
                    columnGap: horizontalSpacing == null ? spacing : horizontalSpacing,
                    rowGap: spacing,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
    },
});

VStack.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    spacing: PropTypes.number,
};

VStack.defaultProps = {
    style: {},
    spacing: 0,
};

export default VStack;
