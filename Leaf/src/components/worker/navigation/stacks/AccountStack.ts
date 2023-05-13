import { strings } from "../../../../localisation/Strings";
import LeafStack from "../../../core/navigation/LeafStack";
import AccountScreen from "../../AccountScreen";
import NewTriageScreen from "../../NewTriageScreen";

export const AccountStack = new LeafStack(
    strings("tabBar.worker.account"),
    "account-circle-outline",
    "account-circle",
)
.addNewScreen(
    strings("header.worker.account"),
    "ACCOUNT",
    AccountScreen,
);