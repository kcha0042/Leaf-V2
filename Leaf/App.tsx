import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import MainScreen from "./src/components/MainScreen";
import { LeafFont } from "./src/components/styling/typography/LeafFont";
import { NotificationSessionProvider } from "./src/components/base/LeafDropNotification/NotificationSession";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        [LeafFont.GilroyExtraBold]: require("./assets/fonts/Gilroy-ExtraBold.otf"),
        [LeafFont.PoppinsMedium]: require("./assets/fonts/Poppins-Medium.ttf"),
        [LeafFont.PoppinsSemiBold]: require("./assets/fonts/Poppins-SemiBold.ttf"),
        [LeafFont.PoppinsBold]: require("./assets/fonts/Poppins-Bold.ttf"),
        [LeafFont.PoppinsMediumItalic]: require("./assets/fonts/Poppins-MediumItalic.ttf"),
        [LeafFont.PoppinsSemiBoldItalic]: require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
        [LeafFont.PoppinsBoldItalic]: require("./assets/fonts/Poppins-BoldItalic.ttf"),
        [LeafFont.CircularMedium]: require("./assets/fonts/CircularStd-Medium.otf"),
        [LeafFont.CircularBold]: require("./assets/fonts/CircularStd-Bold.otf"),
        [LeafFont.CircularBlack]: require("./assets/fonts/CircularStd-Black.otf"),
        [LeafFont.CircularMediumItalic]: require("./assets/fonts/CircularStd-MediumItalic.otf"),
        [LeafFont.CircularBoldItalic]: require("./assets/fonts/CircularStd-BoldItalic.otf"),
        [LeafFont.CircularBlackItalic]: require("./assets/fonts/CircularStd-BlackItalic.otf"),
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
        <PaperProvider theme={theme}>
            <NotificationSessionProvider>
                <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                    <MainScreen />
                </View>
            </NotificationSessionProvider>
        </PaperProvider>
    );
}

const theme = {
    ...DefaultTheme,
};
