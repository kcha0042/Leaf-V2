import { strings } from "../../../../localisation/Strings";
import LeafStack from "../../../core/navigation/LeafStack";
import AdminScreen from "../../AdminScreen";


export const ManageNurseStack = new LeafStack(
    strings("tabBar.admin.manageNurses"),
    "home-outline",
    "home"
)
.addNewScreen(
    strings("header.admin.manageNurses"),
    "MANAGE_NURSES",
    AdminScreen
);