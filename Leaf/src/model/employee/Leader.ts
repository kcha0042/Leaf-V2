import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";

class Leader extends Employee {

    public readonly role: Role = Role.leader;

}

export default Leader;