import React from 'react';
import { Button } from 'react-native-paper';
import { LeafButtonType } from './LeafButtonType';

interface Props {
    label: string
    type: LeafButtonType;
    icon?: string; // https://pictogrammers.com/library/mdi/
    disabled?: boolean;
    onPress: () => void;
}

const LeafButton: React.FC<Props> = ({ label, type, icon = null, disabled = false, onPress }) => {
    return (
        <Button 
            icon={icon}
            mode={type} 
            onPress={onPress}
            disabled={disabled}
        >
            {label}
        </Button>
    );
}

export default LeafButton;