import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    return (
        <SafeAreaView style={styles.safeAreaWrapper}>
            <View style={styles.header}>
                {/* Only have the button if we can go back */}
                {
                    buttonProps.canGoBack ?
                        <TouchableOpacity 
                            onPress={buttonProps.navigation.goBack}
                            style={styles.backButton}    
                        >
                            <Icon name={"chevron-left"} size={35} colour={'#007AFF'}/>
                        </TouchableOpacity>
                    : null
                }
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
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
    padding: 15,
    height: height
  },
  safeAreaWrapper: {
    height: height + 45,
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
    paddingRight: 8
  },
});

export default CustomLeafHeader;
