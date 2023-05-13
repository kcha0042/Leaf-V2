import { StackNavigationProp } from "@react-navigation/stack";
import LeafInterface from "../../core/navigation/LeafAccountUI";
import { YourPatientsStack } from "./stacks/YourPatientsStack";
import { NewTriageStack } from "./stacks/NewTriageStack";
import { PatientsStack } from "./stacks/PatientsStack";
import { AccountStack } from "./stacks/AccountStack";

export const WorkerInterface = new LeafInterface(
    "WORKER_INTERFACE",
    [YourPatientsStack, NewTriageStack, PatientsStack, AccountStack],
);