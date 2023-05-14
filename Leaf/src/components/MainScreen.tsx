import React from "react";
import StateManager from "../state/publishers/StateManager";
import { LoginStatus } from "../state/publishers/types/LoginStatus";
import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";
import { NavigationContainer } from "@react-navigation/native";
import { WorkerInterface } from "./worker/navigation/WorkerInterface";
import { LinearNavigator } from "./core/navigation/navigators/LinearNavigator";
import { loginStack } from "./login/navigation/LoginStack";
import { InterfaceNavigator } from "./core/navigation/navigators/AppNavigator";
import { AdminInterface } from "./admin/navigation/AdminInterface";
import { LeaderInterface } from "./leader/navigation/LeaderInterface";

const MainScreen: React.FC = () => {
    const [loginStatus, setLoginStatus] = React.useState(StateManager.loginStatus.read());

    StateManager.loginStatus.subscribe(() => {
        setLoginStatus(StateManager.loginStatus.read());
    });

    switch (loginStatus) {
        case LoginStatus.loggedOut:
            return (
                <NavigationContainer>
                    <LinearNavigator stack={loginStack} />
                </NavigationContainer>
            );
        case LoginStatus.worker:
            return <InterfaceNavigator leafInterface={WorkerInterface} />
        case LoginStatus.leader:
            return <InterfaceNavigator leafInterface={LeaderInterface} />
        case LoginStatus.admin:
            return <InterfaceNavigator leafInterface={AdminInterface} />
        default:
            throw new UnreachableCaseError(loginStatus);
    }
}

export default MainScreen;