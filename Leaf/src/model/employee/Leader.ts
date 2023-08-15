import Employee from "./Employee";
import { Role } from "./Role";

class Leader extends Employee {
    public readonly role: Role = Role.leader;
}

export default Leader;
