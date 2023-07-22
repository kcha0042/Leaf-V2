import { strings } from "../../localisation/Strings";
import AccountScreen from "../screens/AccountScreen";
import NewTriageScreen from "../screens/NewTriageScreen";
import PatientsScreen from "../screens/PatientsScreen";
import YourPatientsScreen from "../screens/YourPatientsScreen";
import LeafInterface from "./LeafInterface";
import LeafStackRoot from "./LeafStackRoot";
import NavigationEnvironment from "./navigators/NavigationEnvironment";

// TODO: Use string resources

export const WorkerInterface = new LeafInterface()
    .addRoot(
        new LeafStackRoot(
            strings("tabBar.worker.yourPatients"),
            () => {
                // Tab bar
                NavigationEnvironment.inst.navigateTo(
                    YourPatientsScreen,
                    undefined,
                    strings("header.worker.yourPatients"),
                );
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationEnvironment.inst.clearScreens();
                NavigationEnvironment.inst.setSidebarComponent(
                    <YourPatientsScreen />,
                    strings("header.worker.yourPatients"),
                );
            },
            "home-variant",
            "home-variant-outline",
        ),
    )
    .addRoot(
        new LeafStackRoot(
            strings("tabBar.worker.newTriage"),
            () => {
                // Tab bar
                NavigationEnvironment.inst.navigateTo(NewTriageScreen, undefined, strings("header.worker.newTriage"));
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationEnvironment.inst.navigateTo(NewTriageScreen, undefined, strings("header.worker.newTriage"));
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "clipboard-account",
            "clipboard-outline",
        ),
    )
    .addRoot(
        new LeafStackRoot(
            strings("tabBar.worker.patients"),
            () => {
                // Tab bar
                NavigationEnvironment.inst.navigateTo(PatientsScreen, undefined, strings("header.worker.patients"));
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationEnvironment.inst.navigateTo(PatientsScreen, undefined, strings("header.worker.patients"));
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "account-injury",
            "account-injury-outline",
        ),
    )
    .addRoot(
        new LeafStackRoot(
            strings("tabBar.worker.account"),
            () => {
                // Tab bar
                NavigationEnvironment.inst.navigateTo(AccountScreen, undefined, strings("header.worker.account"));
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationEnvironment.inst.navigateTo(AccountScreen, undefined, strings("header.worker.account"));
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "account-circle",
            "account-circle-outline",
        ),
    );
