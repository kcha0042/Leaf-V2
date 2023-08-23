import Employee from "./Employee";
import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

class Admin extends Employee {
    public readonly role: Role = Role.admin;

    public static new(firstName: string, lastName: string): Admin {
        return new Admin(EmployeeID.generate(), firstName, lastName, null, null, false, null);
    }
}

export default Admin;
