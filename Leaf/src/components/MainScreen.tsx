import React from "react";
import LoginScreen from "./login/LoginScreen";
import LeaderScreen from "./leader/LeaderScreen";
import StateManager from "../state/publishers/StateManager";
import { LoginStatus } from "../state/publishers/types/LoginStatus";
import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";
import WorkerScreen from "./worker/WorkerScreen";
import AdminScreen from "./admin/AdminScreen";

const MainScreen: React.FC = () => {
    const [loginStatus, setLoginStatus] = React.useState(StateManager.loginStatus.read());

    StateManager.loginStatus.subscribe(() => {
        setLoginStatus(StateManager.loginStatus.read());
    });

    switch (loginStatus) {
        case LoginStatus.loggedOut:
            return <LoginScreen />
        case LoginStatus.worker:
            return <WorkerScreen />
        case LoginStatus.leader:
            return <LeaderScreen />
        case LoginStatus.admin:
            return <AdminScreen />
        default:
            throw new UnreachableCaseError(loginStatus);
    }
}

export default MainScreen;