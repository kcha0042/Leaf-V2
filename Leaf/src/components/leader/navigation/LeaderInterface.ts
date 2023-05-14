import LeafInterface from "../../core/navigation/LeafAccountUI";
import { ViewNursesStack } from "./stacks/ViewNursesStack";
import { ViewPatientsStack } from "./stacks/ViewPatientsStack";

export const LeaderInterface = new LeafInterface(
    "LEADER_INTERFACE",
    [ViewNursesStack, ViewPatientsStack]
);