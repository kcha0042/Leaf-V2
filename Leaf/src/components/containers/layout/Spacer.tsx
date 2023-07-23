import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

interface Props {
    style?: StyleProp<ViewStyle>;
}

const Spacer: React.FC<Props> = ({ style }) => {
    return <View style={[{ flex: 1 }, style]} />;
};

export default Spacer;
