import { strings } from "../../../../localisation/Strings";
import LeafStack from "../../../core/navigation/LeafStack";
import YourWorkersScreen from "../../YourWorkersScreen";

export const ViewNursesStack = new LeafStack(
    strings("tabBar.leader.viewNurses"),
    "home-outline",
    "home",
)
.addNewScreen(
    strings("header.leader.viewNurses"),
    "VIEW_NURSES",
    YourWorkersScreen
);