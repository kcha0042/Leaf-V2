import { strings } from "../../localisation/Strings";
import LeafInterface from "../navigation/LeafInterface";
import LeafInterfaceSection from "../navigation/LeafInterfaceSection";
import NavigationSession from "../navigation/state/NavigationEnvironment";
import AllNursesScreen from "../screens/AllNursesScreen";

export const AdminInterface = new LeafInterface()
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.admin.nurses"),
            () => {
                // Tab bar
                NavigationSession.inst.navigateTo(AllNursesScreen, undefined, strings("header.admin.viewNurses"));
                NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                NavigationSession.inst.clearScreens();
                NavigationSession.inst.setSidebarComponent(<AllNursesScreen />, strings("header.admin.viewNurses"));
            },
            "hospital-box",
            "hospital-box-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.admin.leaders"),
            () => {
                // Tab bar
                // NavigationSession.inst.navigateTo(YourPatientsScreen, undefined, strings("header.worker.yourPatients"));
                // NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                // NavigationSession.inst.clearScreens();
                // NavigationSession.inst.setSidebarComponent(
                //     <YourPatientsScreen />,
                //     strings("header.worker.yourPatients"),
                // );
            },
            "flag",
            "flag-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.admin.new"),
            () => {
                // Tab bar
                // NavigationSession.inst.navigateTo(YourPatientsScreen, undefined, strings("header.worker.yourPatients"));
                // NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                // NavigationSession.inst.clearScreens();
                // NavigationSession.inst.setSidebarComponent(
                //     <YourPatientsScreen />,
                //     strings("header.worker.yourPatients"),
                // );
            },
            "account-plus",
            "account-plus-outline",
        ),
    )
    .addSection(
        new LeafInterfaceSection(
            strings("tabBar.admin.export"),
            () => {
                // Tab bar
                // NavigationSession.inst.navigateTo(YourPatientsScreen, undefined, strings("header.worker.yourPatients"));
                // NavigationSession.inst.setSidebarComponent(undefined, undefined);
            },
            () => {
                // Drawer
                // NavigationSession.inst.clearScreens();
                // NavigationSession.inst.setSidebarComponent(
                //     <YourPatientsScreen />,
                //     strings("header.worker.yourPatients"),
                // );
            },
            "file-export",
            "file-export-outline",
        ),
    );
