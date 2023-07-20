import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StateManager from '../../state/publishers/StateManager';
import LeafText from '../base/LeafText/LeafText';
import LeafTypography from '../styling/LeafTypography';

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

    const reflectTitleOverride = () => {
      let titleOverride = StateManager.headerTitleOverride.read();
      if (titleOverride != null) {
        setHeaderTitle(titleOverride);
      } else {
        setHeaderTitle(title);
      }
    }

    // Cannot use subscriber pattern here because it will redraw the previous screen's header
    // (Before it has transitoned away)
    // useEffect ensures only the page appearing has its header changed
    useEffect(() => {
      reflectTitleOverride();
    }, []);

    // Side bar item changes don't trigger remounts
    StateManager.sideBarItemPressed.subscribe(() => {
      reflectTitleOverride();
    });

    // Drawer changes don't trigger remounts
    StateManager.drawerItemChanged.subscribe(() => {
      StateManager.headerTitleOverride.publish(null);
      reflectTitleOverride();
    });

    return (
            <View style={{
              backgroundColor: backgroundColor,
              ...styles.header
            }}>
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
    )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 10,
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
