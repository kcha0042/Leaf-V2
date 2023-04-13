import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LeafButton, { LeafButtonType } from './src/components/core/views/LeafButton/LeafButton';
import LeafTextInput, { LeafTextInputType } from './src/components/core/views/LeafTextInput/LeafTextInput';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
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
      </View>
    </PaperProvider>
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
