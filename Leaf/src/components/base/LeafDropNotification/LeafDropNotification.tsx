import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import LeafColors from '../../styling/LeafColors';
import FlatContainer from '../../containers/FlatContainer';
import VStack from '../../containers/VStack';
import LeafText from '../LeafText/LeafText';
import LeafTypography from '../../styling/LeafTypography';

interface Props {
  isVisible: boolean;
  title: string;
  message: string;
  style?: ViewStyle;
  onClose: () => void;
}

const LeafDropNotification: React.FC<Props> = ({
  isVisible,
  title,
  message,
  onClose,
  style
}) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);
  const modalRef = useRef<Modal>(null);

  // Handle closing the modal
  const closeModal = () => {
    setModalVisible(false);
    if (onClose) {
      onClose();
    }
  };

  // Handle modal backdrop press
  const handleBackdropPress = () => {
    closeModal();
  };

  const {height, width} = Dimensions.get('window');

  // Update modal visibility when props change
  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleBackdropPress}
      ref={modalRef}
      backdropOpacity={0}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      useNativeDriver={true}
      style={{ justifyContent: 'flex-start', alignSelf: 'center', marginTop: height * 0.01}}
    >
      <FlatContainer style={{ marginLeft: width * 0.2, marginRight: width * 0.2, }}>
        <VStack style={{alignSelf: 'center', borderWidth: 1}} spacing={6}>
            <LeafText typography={LeafTypography.title3} style={{borderWidth: 1, alignSelf: 'center'}}>{title}</LeafText>
            <VStack style={{alignSelf: 'center'}}>
                <LeafText typography={LeafTypography.subscript} style={{borderWidth: 1 ,alignSelf: 'center'}}>{message}</LeafText>
            </VStack>
        </VStack>
      </FlatContainer>
    </Modal>
  );
};

export default LeafDropNotification;
