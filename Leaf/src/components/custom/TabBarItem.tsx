import React from 'react';
import { View, ViewStyle } from 'react-native';
import LeafStackRoot from '../navigation/LeafStackRoot';
import VStack from '../containers/VStack';
import LeafIconButton from '../base/LeafIconButton/LeafIconButton';
import NavigationEnvironment from '../navigation/navigators/NavigationEnvironment';
import LeafColors from '../styling/LeafColors';
import LeafText from '../base/LeafText/LeafText';
import LeafTypography from '../styling/LeafTypography';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LeafIcon from '../base/LeafIcon/LeafIcon';

interface Props {
    leafStackRoot: LeafStackRoot;
}

const TabBarItem: React.FC<Props> = ({ 
    leafStackRoot,
}) => {
    let isFocused = NavigationEnvironment.inst.focusedStackRoot != undefined && NavigationEnvironment.inst.focusedStackRoot.matches(leafStackRoot.id);
    let icon = isFocused ? leafStackRoot.focusedIcon : leafStackRoot.icon;
    let size = 30
    let padding = 10
    return (
        <VStack 
            spacing={5} 
            style={{ 
                alignItems: 'center', 
                alignSelf: 'flex-start', 
                paddingBottom: 8, 
            }}
        >
            <TouchableWithoutFeedback
                onPress={leafStackRoot.activateStack}
                style={{ paddingVertical: padding, paddingHorizontal: 30 }}
            >
                <LeafIcon
                    icon={icon} 
                    color={LeafColors.textDark}
                    size={size}
                />
            </TouchableWithoutFeedback>

            <View style={{ position: 'absolute', top: size + padding + 4, flex: 1 }}>
                <LeafText 
                    typography={LeafTypography.subscriptLabel}
                    style={{ alignSelf: 'center', textAlign: 'center' }}
                >
                    {leafStackRoot.title}
                </LeafText>
            </View>
        </VStack>
    );
}

export default TabBarItem;