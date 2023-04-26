import { Spacer, VStack } from "native-base";
import React from "react";
import LeafText from "./core/views/LeafText/LeafText";
import LeafTypography from "./core/styles/LeafTypography";
import LeafDimensions from "./core/styles/LeafDimensions";
import LoginScreen from "./login/LoginScreen";
import LeaderScreen from "./leader/LeaderScreen";
import StateManager from "../state/StateManager";

const MainScreen: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    StateManager.isLoggedIn.subscribe(() => {
        setIsLoggedIn(StateManager.isLoggedIn.read());
    });

    return isLoggedIn ? (
        <LeaderScreen />
    ) : (
        <LoginScreen />
    );
}

export default MainScreen;