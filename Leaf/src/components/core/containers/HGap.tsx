import React from 'react';
import { View } from 'react-native';

interface Props {
  size: number;
}

const HGap: React.FC<Props> = ({ size }) => {
  return <View style={{ width: size }} />;
};

export default HGap;
