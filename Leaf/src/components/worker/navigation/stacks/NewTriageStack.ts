import { strings } from "../../../../localisation/Strings";
import LeafStack from "../../../core/navigation/LeafStack";
import NewTriageScreen from "../../NewTriageScreen";

export const NewTriageStack = new LeafStack(
    strings("tabBar.worker.newTriage"),
    "clipboard-outline",
    "clipboard-account",
)
.addNewScreen(
    strings("header.worker.newTriage"),
    "NEW_TRIAGE",
    NewTriageScreen,
);