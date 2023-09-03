import { strings } from "../../localisation/Strings";
import LeafInterface from "../navigation/LeafInterface";
import LeafInterfaceSection from "../navigation/LeafInterfaceSection";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import AccountScreen from "../screens/AccountScreen";
import EventDashboardScreen from "../screens/EventsDashboardScreen";
import NewTriageScreen from "../screens/NewTriageScreen";
import YourPatientsScreen from "../screens/YourPatientsScreen";

export const WorkerInterface = new LeafInterface()
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.worker.yourPatients"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(YourPatientsScreen, undefined, strings("header.worker.patients"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.clearScreens();
                NavigationSession.inst.setSidebarComponent(<YourPatientsScreen />, strings("header.worker.patients"));
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
            strings("tabBar.worker.events"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(EventDashboardScreen, undefined, strings("header.worker.events"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.navigateTo(EventDashboardScreen, undefined, strings("header.worker.events"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            "calendar-clock",
            "calendar-clock-outline",
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
