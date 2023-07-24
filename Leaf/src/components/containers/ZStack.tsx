import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";

const ZStack = ({ children, style }) => {
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
