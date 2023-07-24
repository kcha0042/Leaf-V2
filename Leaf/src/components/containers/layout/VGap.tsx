import React from "react";
import { View } from "react-native";

interface Props {
    size: number;
}

const VGap: React.FC<Props> = ({ size }) => {
    return <View style={{ height: size }} />;
};

export default VGap;
