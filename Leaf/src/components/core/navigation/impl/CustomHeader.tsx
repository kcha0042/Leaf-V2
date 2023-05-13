import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StateManager from '../../../../state/publishers/StateManager';
import LeafText from '../../views/LeafText/LeafText';
import LeafTypography from '../../styles/LeafTypography';
import Environment from '../../../../state/environment/Environment';
import { ScreenType } from '../../../../state/environment/types/ScreenType';
import LeafDimensions from '../../styles/LeafDimensions';
import LeafBaseDimensions from '../../styles/LeafBaseDimensions';
import LeafIcon from '../../views/LeafIcon/LeafIcon';

type CustomLeafHeaderProps = {
  title: string;
  buttonProps: LeftButtonProps;
};

type LeftButtonProps = {
    canGoBack: boolean;
    navigation: any;
};

/**
 * A custom header that will be displayed at the top of our stacks, it takes in a button that allows navigation backwards
 * @param param0 {@link CustomLeafHeaderProps}
 * @returns custom JSX element
 */
const CustomLeafHeader: React.FC<CustomLeafHeaderProps> = ({ title, buttonProps }) => {

    // Use a hook to define background color
    // Otherwise state updates won't redraw the component
    const [backgroundColor, setBackgroundColor] = React.useState<string>(StateManager.headerColor.read());

    const [headerTitle, setHeaderTitle] = React.useState<string>(title);

    StateManager.headerColor.subscribe(() => {
        setBackgroundColor(StateManager.headerColor.read());
    });

    useEffect(() => {
      let titleOverride = StateManager.headerTitleOverride.read();
      if (titleOverride != null) {
        setHeaderTitle(titleOverride);
      } else {
        setHeaderTitle(title);
      }
    }, []);

    return (
        <SafeAreaView 
          edges={['top']}
          style={[
            styles.safeAreaWrapper,
            { backgroundColor: backgroundColor },
          ]}
        >
            <View style={styles.header}>
                {/* Only have the button if we can go back */}
                {
                    buttonProps.canGoBack ?
                        <TouchableOpacity 
                            onPress={buttonProps.navigation.goBack}
                            style={styles.backButton}    
                        >
                            <Icon name={"chevron-left"} size={45} colour={'#007AFF'} style={{marginLeft: -10}} />
                        </TouchableOpacity>
                    : null
                }
                <LeafText typography={LeafTypography.header}>
                  {headerTitle}
                </LeafText>
            </View>
        </SafeAreaView>
    )
};

const height = 80;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  safeAreaWrapper: {
    // None
  },
  titleWrapper: {
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    paddingRight: 6,
  },
});

export default CustomLeafHeader;
