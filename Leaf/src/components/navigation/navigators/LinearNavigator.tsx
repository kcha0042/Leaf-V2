import { createStackNavigator } from "@react-navigation/stack";
import LeafScreen from "../LeafScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import NavigationEnvironment from "./NavigationEnvironment";
import NavigationStateManager from "./NavigationStateManager";

interface Props {
    screen: LeafScreen;
}

export const LinearNavigator: React.FC<Props> = ({ screen }) => {
    const [screens, setScreens] = useState<LeafScreen[]>([screen]);

    const Stack = createStackNavigator();

    useEffect(() => {
        NavigationEnvironment.inst.setStartingScreen(screen);

        NavigationStateManager.newScreenAdded.subscribe(() => {
            setScreens([...NavigationEnvironment.inst.screens]);
        });
    }, []);

    useEffect(() => {
        NavigationEnvironment.inst.loadedNavigation();
        NavigationEnvironment.inst.loadedNavigation = () => {};
    }, [screens]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {screens.map((screen) => {
                    return (
                        <Stack.Screen
                            key={screen.id.toString()}
                            name={screen.id.toString()}
                            component={screen.component}
                            options={({ navigation }) => ({
                                ...screen.options,
                                header: () => <></>,
                            })}
                        />
                    );
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
