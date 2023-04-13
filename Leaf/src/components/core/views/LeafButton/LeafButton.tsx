import React from 'react';
import { Button } from 'react-native-paper';

interface Props {
    type: LeafButtonType;
    disabled?: boolean
    onPress: () => void;
}

export enum LeafButtonType {
    filled = "contained",
    outlined = "outlined"
}

const LeafButton: React.FC<Props> = ({ type, disabled = false, onPress }) => {
    return (
        <Button 
            icon="camera" 
            mode={type} 
            onPress={onPress}
            disabled={disabled}
        >
            Press me
        </Button>
    );
}

export default LeafButton;