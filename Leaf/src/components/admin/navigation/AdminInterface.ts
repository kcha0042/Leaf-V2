import LeafInterface from "../../core/navigation/LeafAccountUI";
import { ManageNurseStack } from "./stacks/ManageNursesStack";

export const AdminInterface = new LeafInterface(
    "ADMIN_INTERFACE",
    [ManageNurseStack]
);