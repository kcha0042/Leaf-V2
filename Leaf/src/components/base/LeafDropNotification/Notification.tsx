import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FlatContainer from '../../containers/FlatContainer';
import LeafText from '../LeafText/LeafText';
import VStack from '../../containers/VStack';
import LeafTypography from '../../styling/LeafTypography';

interface NotificationProps {
    title: string;
  message: string;
  onAnimationEnd: () => void;
}

const Notification: React.FC<NotificationProps> = ({ title, message, onAnimationEnd }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      // Wait for a duration and then trigger the slide-out animation
      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -200,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          onAnimationEnd();
        });
      }, 2000); // Auto-hide after 2 seconds
    });
  }, [translateY, onAnimationEnd]);

  const insets = useSafeAreaInsets();

  return (
    <Animated.View style={[{
        backgroundColor: 'transparent',
        marginTop: insets.top,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999, // Ensure the notification is on top of everything
      }, { transform: [{ translateY }] }]}>
        <FlatContainer style={{flex: 1, alignItems: 'center'}}>
            <VStack spacing={6} style={{flex: 1, alignSelf: 'center'}}>
                <LeafText typography={LeafTypography.title3} wide={false} style={{alignSelf: 'center'}}>{title}</LeafText>
                <VStack style={{alignSelf: 'center'}}>
                    <LeafText typography={LeafTypography.subscript} wide={false} style={{alignSelf: 'center'}}>{message}</LeafText>
                </VStack>
            </VStack>
        </FlatContainer>
    </Animated.View>
  );
};

export default Notification;
