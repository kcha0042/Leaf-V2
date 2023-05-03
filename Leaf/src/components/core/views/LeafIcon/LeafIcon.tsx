import React from 'react';
import { ViewStyle } from 'react-native';
import LeafColor from '../../styles/color/LeafColor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LeafIconSize } from './LeafIconSize';

interface Props {
    // Icon name (https://pictogrammers.com/library/mdi/)
    icon: string;
    // Icon fill color
    color: LeafColor;
    // Icon size
    size: LeafIconSize;
    // Custom style
    style?: ViewStyle;
}

const LeafIcon: React.FC<Props> = ({ 
    icon,
    color,
    size,
    style,
}) => {
    return (
        <Icon 
            name={icon} 
            size={size} 
            color={color.getColor()} 
            style={style}
        />
    );
}

export default LeafIcon;