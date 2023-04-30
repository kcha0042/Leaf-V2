import React from 'react';
import { Button } from 'react-native-paper';
import { LeafButtonType } from './LeafButtonType';
import LeafText from '../LeafText/LeafText';
import Environment from '../../../../state/environment/Environment';
import { OS } from '../../../../state/environment/types/OS';
import { ViewStyle } from 'react-native';
import LeafTypographyConfig from '../../styles/typography/LeafTypographyConfig';
import LeafColor from '../../styles/color/LeafColor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    label: string;
    type: LeafButtonType;
    typography: LeafTypographyConfig;
    color: LeafColor;
    icon?: string; // https://pictogrammers.com/library/mdi/
    disabled?: boolean;
    style?: ViewStyle;
    onPress: () => void;
}

const LeafButton: React.FC<Props> = ({ 
    label, 
    type, 
    typography,
    color,
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

    if (disabled) {
        // Override colour when disabled
        typography.presetColor = undefined;
    }
    
    return (
        <Button 
            icon={({ size, color }) => (
                <Icon name={icon} size={size + 8} color={color} />
            )}
            mode={type} 
            onPress={onPress}
            disabled={disabled}
            labelStyle={[
                { padding: 2 },
                labelStyle,
            ]}
            style={[
                style,
                { 
                    borderRadius: 50, 
                    width: "100%"
                },
            ]}
            buttonColor={color.getColor()}
        >
            <LeafText typography={typography}>
                {label}
            </LeafText>
        </Button>
    );
}

export default LeafButton;