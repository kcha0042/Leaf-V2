import React from "react";
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