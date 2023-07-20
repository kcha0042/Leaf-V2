import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";
import UUID from "../model/core/UUID";
import StateManager from "../state/publishers/StateManager";
import { LoginStatus } from "../state/publishers/types/LoginStatus";
import { WorkerInterface } from "./navigation/AllLeafInterfaces";
import LeafScreen from "./navigation/LeafScreen";
import { InterfaceNavigator } from "./navigation/navigators/AppNavigator";
import { LinearNavigator } from "./navigation/navigators/LinearNavigator";
import LoginScreen from "./login/LoginScreen";

const MainScreen: React.FC = () => {
    const [loginStatus, setLoginStatus] = React.useState(StateManager.loginStatus.read());

    StateManager.loginStatus.subscribe(() => {
        setLoginStatus(StateManager.loginStatus.read());
    });

    switch (loginStatus) {
        case LoginStatus.loggedOut:
            return (
                <NavigationContainer>
                    {/* TODO: Fix this */}
                    <LinearNavigator screens={
                        [
                            new LeafScreen(
                                "Login",
                                UUID.generate().toString(),
                                LoginScreen,
                                {}
                            )
                        ]
                    } />
                </NavigationContainer>
            );
        case LoginStatus.worker:
            return <InterfaceNavigator leafInterface={WorkerInterface} />
        case LoginStatus.leader:
            return <InterfaceNavigator leafInterface={WorkerInterface} />
        case LoginStatus.admin:
            return <InterfaceNavigator leafInterface={WorkerInterface} />
        default:
            throw new UnreachableCaseError(loginStatus);
    }
}

export default MainScreen;