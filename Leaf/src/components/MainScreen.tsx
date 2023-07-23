import React from "react";
import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";
import StateManager from "../state/publishers/StateManager";
import { LoginStatus } from "../state/publishers/types/LoginStatus";
import { WorkerInterface } from "./interfaces/WorkerInterface";
import LeafScreen from "./navigation/LeafScreen";
import { InterfaceNavigator } from "./navigation/navigators/InterfaceNavigator";
import { LinearNavigator } from "./navigation/navigators/LinearNavigator";
import LoginScreen from "./screens/LoginScreen";

const MainScreen: React.FC = () => {
    const [loginStatus, setLoginStatus] = React.useState(StateManager.loginStatus.read());

    StateManager.loginStatus.subscribe(() => {
        setLoginStatus(StateManager.loginStatus.read());
    });

    switch (loginStatus) {
        case LoginStatus.LoggedOut:
            return <LinearNavigator screen={new LeafScreen("", LoginScreen)} />;
        case LoginStatus.Worker:
            return <InterfaceNavigator leafInterface={WorkerInterface} />;
        case LoginStatus.Leader:
            return <InterfaceNavigator leafInterface={WorkerInterface} />;
        case LoginStatus.Admin:
            return <InterfaceNavigator leafInterface={WorkerInterface} />;
        default:
            throw new UnreachableCaseError(loginStatus);
    }
};

export default MainScreen;
