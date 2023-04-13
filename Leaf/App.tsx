import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Form from './src/components/Form';
import FormOutput from './src/components/FormOutput';

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView>
          <VStack>
            <Form />
            <FormOutput />
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
