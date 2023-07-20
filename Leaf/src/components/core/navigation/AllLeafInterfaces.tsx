import AccountScreen from "../../worker/AccountScreen";
import NewTriageScreen from "../../worker/NewTriageScreen";
import PatientsScreen from "../../worker/PatientsScreen";
import YourPatientsScreen from "../../worker/YourPatientsScreen";
import LeafInterface from "./LeafInterface";
import LeafStackRoot from "./LeafStackRoot";
import NavigationEnvironment from "./navigators/NavigationEnvironment";

export const WorkerInterface = new LeafInterface()
    .addRoot(
        new LeafStackRoot(
            "Home",
            () => {
                NavigationEnvironment.inst.clearScreens();
                NavigationEnvironment.inst.setSidebarComponent(<YourPatientsScreen />, "Your Patients");
            },
            "home",
            "home-outline",
        )
    )
    .addRoot(
        new LeafStackRoot(
            "Triage",
            () => {
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
            () => {
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
            () => {
                NavigationEnvironment.inst.navigationTo(AccountScreen, undefined, "Your Account");
                NavigationEnvironment.inst.setSidebarComponent(undefined, undefined);
            },
            "account-circle",
            "account-circle-outline"
        )
    )