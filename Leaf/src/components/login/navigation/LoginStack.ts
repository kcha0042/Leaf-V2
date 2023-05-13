import LeafStack from "../../core/navigation/LeafStack";
import LoginScreen from "../LoginScreen";

export const loginStack = new LeafStack(
    null, // No tab bar
    null, // No tab bar
    null, // No tab bar
)
.addNewScreen(
    "_", // No header
    "LOGIN",
    LoginScreen,
);