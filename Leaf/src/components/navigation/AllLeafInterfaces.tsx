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
            "Home",
            () => { // Tab bar
                NavigationEnvironment.inst.navigationTo(YourPatientsScreen, undefined, "Your Patients");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => { // Drawer
                NavigationEnvironment.inst.clearScreens();
                NavigationEnvironment.inst.setSidebarComponent(<YourPatientsScreen />, "Your Patients");
            },
            "home-variant",
            "home-variant-outline",
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Triage",
            () => { // Tab bar
                NavigationEnvironment.inst.navigationTo(NewTriageScreen, undefined, "New Triage");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => { // Drawer
                NavigationEnvironment.inst.navigationTo(NewTriageScreen, undefined, "New Triage");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "clipboard-account",
            "clipboard-outline"
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Patients",
            () => { // Tab bar
                NavigationEnvironment.inst.navigationTo(PatientsScreen, undefined, "Patients");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => { // Drawer
                NavigationEnvironment.inst.navigationTo(PatientsScreen, undefined, "Patients");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "account-injury",
            "account-injury-outline"
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Account",
            () => { // Tab bar
                NavigationEnvironment.inst.navigationTo(AccountScreen, undefined, "Your Account");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            () => { // Drawer
                NavigationEnvironment.inst.navigationTo(AccountScreen, undefined, "Your Account");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "account-circle",
            "account-circle-outline"
        )
    )