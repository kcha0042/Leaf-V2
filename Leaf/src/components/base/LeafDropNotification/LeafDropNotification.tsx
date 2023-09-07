// /*
// Currently not in use, as using Modal removes the ability to interact with Parent View.
// */

// import React, { useState, useEffect, useRef } from 'react';
// import { ViewStyle, Dimensions, View } from 'react-native';
// import Modal from 'react-native-modal';
// import LeafColors from '../../styling/LeafColors';
// import FlatContainer from '../../containers/FlatContainer';
// import VStack from '../../containers/VStack';
// import LeafText from '../LeafText/LeafText';
// import LeafTypography from '../../styling/LeafTypography';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// interface Props {
//   isVisible: boolean;
//   title: string;
//   message: string;
//   style?: ViewStyle;
//   onClose: () => void;
// }

// const LeafDropNotification: React.FC<Props> = ({
//   isVisible,
//   title,
//   message,
//   onClose,
//   style
// }) => {
//   const [isModalVisible, setModalVisible] = useState(isVisible);
//   const modalRef = useRef<Modal>(null);
//   const insets = useSafeAreaInsets();

//   // Handle closing the modal
//   const closeModal = () => {
//     setModalVisible(false);
//     if (onClose) {
//       onClose();
//     }
//   };

//   // Handle modal backdrop press
//   const handleBackdropPress = () => {
//     closeModal();
//   };

//   const {height, width} = Dimensions.get('window');

//   // Update modal visibility when props change
//   useEffect(() => {
//     setModalVisible(isVisible);
//   }, [isVisible]);

//   return (
//     <Modal
//       isVisible={isModalVisible}
//       onBackdropPress={handleBackdropPress}
//       ref={modalRef}
//       backdropOpacity={0}
//       animationIn="slideInDown"
//       animationOut="slideOutUp"
//       useNativeDriver={true}
//       style={{flex: 0,justifyContent: 'flex-start', marginTop: insets.top, borderWidth: 1}}
//       hideModalContentWhileAnimating={true}
//     >
//       <FlatContainer style={{ alignItems:'center',}}>
//         <VStack style={{alignSelf: 'center'}} spacing={6}>
//             <LeafText typography={LeafTypography.title3} style={{borderWidth: 1, alignSelf: 'center'}} wide={false}>{title}</LeafText>
//             <VStack style={{alignSelf: 'center'}}>
//                 <LeafText typography={LeafTypography.subscript} style={{borderWidth: 1 , alignSelf: 'center'}} wide={false}>{message}</LeafText>
//             </VStack>
//         </VStack>
//       </FlatContainer>
//     </Modal>
//   );
// };

// export default LeafDropNotification;
