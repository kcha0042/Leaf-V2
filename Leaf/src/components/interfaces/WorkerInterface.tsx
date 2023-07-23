import { strings } from "../../localisation/Strings";
import AccountScreen from "../screens/AccountScreen";
import NewTriageScreen from "../screens/NewTriageScreen";
import PatientsScreen from "../screens/PatientsScreen";
import YourPatientsScreen from "../screens/YourPatientsScreen";
import LeafInterface from "../navigation/LeafInterface";
import LeafInterfaceSection from "../navigation/LeafInterfaceSection";
import NavigationSession from "../navigation/state/NavigationEnvironment";

export const WorkerInterface = new LeafInterface()
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.worker.yourPatients"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(YourPatientsScreen, undefined, strings("header.worker.yourPatients"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.clearScreens();
                NavigationSession.inst.setSidebarComponent(
                    <YourPatientsScreen />,
                    strings("header.worker.yourPatients"),
                );
            },
            "home-variant",
            "home-variant-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.worker.newTriage"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(NewTriageScreen, undefined, strings("header.worker.newTriage"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.navigateTo(NewTriageScreen, undefined, strings("header.worker.newTriage"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            "clipboard-account",
            "clipboard-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.worker.patients"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(PatientsScreen, undefined, strings("header.worker.patients"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.navigateTo(PatientsScreen, undefined, strings("header.worker.patients"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            "account-injury",
            "account-injury-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.worker.account"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(AccountScreen, undefined, strings("header.worker.account"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.navigateTo(AccountScreen, undefined, strings("header.worker.account"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            "account-circle",
            "account-circle-outline",
        ),
    );
