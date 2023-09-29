import PropTypes from "prop-types";
import React from "react";
import { View, ViewStyle } from "react-native";

interface Props {
    children: any;
    style?: ViewStyle;
}

const ZStack: React.FC<Props> = ({ children, style }) => {
    const childrenWithPosition = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            style: [{ position: "absolute" }, child.props.style],
        });
    });

    return <View style={style}>{childrenWithPosition}</View>;
};

ZStack.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ZStack.defaultProps = {
    style: {},
};

export default ZStack;
