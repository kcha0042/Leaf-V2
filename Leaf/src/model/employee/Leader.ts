import Employee from "./Employee";
import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

class Leader extends Employee {
    public readonly role: Role = Role.leader;

    public static new(firstName: string, lastName: string): Leader {
        return new Leader(EmployeeID.generate(), firstName, lastName, null, null);
    }
}

export default Leader;
