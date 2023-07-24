import Employee from "./Employee";
import { Role } from "./Role";

class Admin extends Employee {
    public readonly role: Role = Role.Admin;
}

export default Admin;