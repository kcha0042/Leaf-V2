import React from 'react';
import { Button } from 'react-native-paper';
import { LeafButtonType } from './LeafButtonType';
import LeafText from '../LeafText/LeafText';
import Environment from '../../../../state/environment/Environment';
import { OS } from '../../../../state/environment/OS';
import { LeafPresetTypography } from '../../styles/presets/LeafPresetTypography';
import { ViewStyle } from 'react-native';

interface Props {
    label: string;
    type: LeafButtonType;
    typography: LeafPresetTypography;
    icon?: string; // https://pictogrammers.com/library/mdi/
    disabled?: boolean;
    style?: ViewStyle;
    onPress: () => void;
}

const LeafButton: React.FC<Props> = ({ 
    label, 
    type, 
    typography,
    icon = null, 
    disabled = false, 
    style,
    onPress,
}) => {
    // TODO: Figure out a better way to centre the text
    let os: OS = Environment.instance.getOS();
    let labelStyle = {}
    if (os != OS.web) {
        labelStyle = { lineHeight: 0 } // Centres the text
    }
    
    return (
        <Button 
            icon={icon}
            mode={type} 
            onPress={onPress}
            disabled={disabled}
            labelStyle={labelStyle}
            style={style}
        >
            <LeafText typography={typography}>
                {label}
            </LeafText>
        </Button>
    );
}

export default LeafButton;