import React from "react";
import { Button } from 'react-native-paper';

interface Props {
    type: LeafButtonType;
    onPress: () => void;
}

export enum LeafButtonType {
    filled = "contained",
    outlined = "outlined"
}

const LeafButton: React.FC<Props> = ({ type, onPress }) => {
    return (
        <Button 
            icon="camera" 
            mode={type} 
            onPress={onPress}
        >
            Press me
        </Button>
    );
}

export default LeafButton;