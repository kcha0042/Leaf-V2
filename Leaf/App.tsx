import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Form from './src/components/Form';
import FormOutput from './src/components/FormOutput';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import { LeafFont } from './src/components/core/styles/typography/LeafFont';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    [LeafFont.gilroyExtraBold]: require('./assets/fonts/Gilroy-ExtraBold.otf'),
    [LeafFont.poppinsMedium]: require('./assets/fonts/Poppins-Medium.ttf'),
    [LeafFont.poppinsBold]: require('./assets/fonts/Poppins-Bold.ttf'),
    [LeafFont.poppinsMediumItalic]: require('./assets/fonts/Poppins-MediumItalic.ttf'),
    [LeafFont.poppinsBoldItalic]: require('./assets/fonts/Poppins-BoldItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <View onLayout={onLayoutRootView}>
          <SafeAreaView>
            <VStack>
              <Form />
              <FormOutput />
            </VStack>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </NativeBaseProvider>
  );
}

const theme = {
  ...DefaultTheme,
}
