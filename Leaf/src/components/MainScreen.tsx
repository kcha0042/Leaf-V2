import React from "react";
import LoginScreen from "./login/LoginScreen";
import LeaderScreen from "./leader/LeaderScreen";
import StateManager from "../state/publishers/StateManager";
import { LoginStatus } from "../state/publishers/types/LoginStatus";
import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";
import AdminScreen from "./admin/AdminScreen";
import { DrawerNavigator } from "./core/navigation/navigators/DrawerNavigator";
import Environment from "../state/environment/Environment";
import { ScreenType } from "../state/environment/types/ScreenType";
import { NavigationContainer } from "@react-navigation/native";
import { TabBarNavigator } from "./core/navigation/navigators/TabBarNavigator";
import { WorkerInterface } from "./worker/navigation/WorkerInterface";
import LeafStack from "./core/navigation/LeafStack";
import { LinearNavigator } from "./core/navigation/navigators/LinearNavigator";
import { loginStack } from "./login/navigation/LoginStack";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InterfaceNavigator } from "./core/navigation/navigators/AppNavigator";

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
            return <InterfaceNavigator leafInterface={WorkerInterface} />
        case LoginStatus.admin:
            return <InterfaceNavigator leafInterface={WorkerInterface} />
        default:
            throw new UnreachableCaseError(loginStatus);
    }
}

export default MainScreen;