import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LeafButton, { LeafButtonType } from './src/components/core/views/LeafButton/LeafButton';
import LeafTextInput, { LeafTextInputType } from './src/components/core/views/LeafTextInput/LeafTextInput';
import { NativeBaseProvider, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView>
        <VStack space={4} paddingX={4}>
          <LeafButton 
            type={LeafButtonType.filled} 
            onPress={() => {console.log("Hello World")}} 
          />

          <LeafButton 
            type={LeafButtonType.filled} 
            onPress={() => {console.log("Hello World")}} 
          />

          <LeafTextInput 
            label={"Testing"}
            type={LeafTextInputType.outlined}
            onTextChange={(text) => console.log(text)}
          />

          <StatusBar style="auto" />
        </VStack>
        </SafeAreaView>
      </PaperProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
  },
});

const theme = {
  ...DefaultTheme,
}
