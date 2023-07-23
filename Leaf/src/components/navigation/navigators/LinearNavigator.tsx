import { createStackNavigator } from "@react-navigation/stack";
import LeafScreen from "../LeafScreen";

interface Props {
    screens: LeafScreen[];
}

export const LinearNavigator: React.FC<Props> = ({ screens }) => {
    const Stack = createStackNavigator();

    // TODO: Clean up whatever this is supposed to be

    return (
        <Stack.Navigator>
            {screens.map((screen) => {
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
