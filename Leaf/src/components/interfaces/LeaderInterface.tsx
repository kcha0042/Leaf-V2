import { strings } from "../../localisation/Strings";
import AccountScreen from "../screens/AccountScreen";
import NewTriageScreen from "../screens/NewTriageScreen";
import PatientsScreen from "../screens/PatientsScreen";
import YourPatientsScreen from "../screens/YourPatientsScreen";
import LeafInterface from "../navigation/LeafInterface";
import LeafInterfaceSection from "../navigation/LeafInterfaceSection";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import YourWorkersScreen from "../screens/YourWorkersScreen";
import AllocatePatientsScreen from "../screens/AllocatePatientsScreen";

export const LeaderInterface = new LeafInterface()
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.leader.viewNurses"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(YourWorkersScreen, undefined, strings("header.leader.viewNurses"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.clearScreens();
                NavigationSession.inst.setSidebarComponent(<YourWorkersScreen />, strings("header.leader.viewNurses"));
            },
            "hospital-box",
            "hospital-box-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.leader.viewPatients"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(
                    AllocatePatientsScreen,
                    undefined,
                    strings("header.leader.viewPatients"),
                );
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.clearScreens();
                NavigationSession.inst.setSidebarComponent(
                    <AllocatePatientsScreen />,
                    strings("header.leader.viewPatients"),
                );
            },
            "account-injury",
            "account-injury-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.leader.account"),
            () => {
                // Tab bar
            },
            () => {
                // Drawer
            },
            "account-circle",
            "account-circle-outline",
        ),
    );
