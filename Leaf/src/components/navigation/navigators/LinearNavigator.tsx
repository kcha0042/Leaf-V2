import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import LeafScreen from "../LeafScreen";

interface Props {
    screens: LeafScreen[];
}

export const LinearNavigator: React.FC<Props> = ({ screens }) => {
    const Stack = createStackNavigator();

    // TODO: Clean up whatever this is supposed to be

    const { height, width } = useSafeAreaFrame();
    const { top, bottom } = useSafeAreaInsets();
    const styles = {
        top: {
            paddingTop: top,
        },
        bottom: {
            marginBottom: bottom,
        },
    };

    return (
        <Stack.Navigator>
            {screens.map((screen, index) => {
                return (
                    <Stack.Screen
                        key={screen.id}
                        name={screen.id}
                        component={screen.component}
                        options={({ navigation }) => ({
                            ...screen.options,
                            header: () => <></>,
                        })}
                    />
                );
            })}
        </Stack.Navigator>
    );
};
