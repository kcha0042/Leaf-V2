import { strings } from "../../../../localisation/Strings";
import LeafStack from "../../../core/navigation/LeafStack";
import AllocatePatientsScreen from "../../AllocatePatientsScreen";

export const ViewPatientsStack = new LeafStack(
    strings("tabBar.leader.viewPatients"),
    "home-outline",
    "home",
).addNewScreen(strings("header.leader.viewPatients"), "VIEW_PATIENTS", AllocatePatientsScreen);
