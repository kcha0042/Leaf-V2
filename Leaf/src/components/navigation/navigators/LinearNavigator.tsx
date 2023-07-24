import { createStackNavigator } from "@react-navigation/stack";
import LeafScreen from "../LeafScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import NavigationSession from "../state/NavigationEnvironment";
import NavigationStateManager from "../state/NavigationStateManager";
import Environment from "../../../state/environment/Environment";
import { OS } from "../../../state/environment/types/OS";
import { LayoutChangeEvent, View } from "react-native";
import StateManager from "../../../state/publishers/StateManager";
import LeafDimensions from "../../styling/LeafDimensions";

interface Props {
    screen: LeafScreen;
}

export const LinearNavigator: React.FC<Props> = ({ screen }) => {
    const [screens, setScreens] = useState<LeafScreen[]>([screen]);
    const PlatformIsWeb = Environment.inst.getOS() == OS.Web;

    const Stack = createStackNavigator();

    useEffect(() => {
        NavigationSession.inst.setStartingScreen(screen);

        NavigationStateManager.screenStackUpdated.subscribe(() => {
            setScreens([...NavigationSession.inst.screens]);
        });
    }, []);

    useEffect(() => {
        NavigationSession.inst.loadedNavigation();
        NavigationSession.inst.loadedNavigation = () => {};
    }, [screens]);

    const onLayout = (event: LayoutChangeEvent) => {
        const layout = event.nativeEvent.layout;
        if (layout.width > 0) {
            // Only if this component is visible
            // Assume the content component has screen padding
            StateManager.contentWidth.publish(layout.width - LeafDimensions.screenPadding * 2);
        }
    };

    return (
        <View onLayout={onLayout} style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    {screens.map((screen, index) => {
                        return (
                            <Stack.Screen
                                key={screen.id.toString()}
                                name={screen.id.toString()}
                                component={screen.component}
                                options={({ navigation }) => ({
                                    ...screen.options,
                                    animationEnabled: index > 0 && !PlatformIsWeb,
                                    header: () => <></>,
                                })}
                            />
                        );
                    })}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};
