import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

abstract class Employee {
    public readonly id: EmployeeID;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string;
    public abstract readonly role: Role;
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(id: EmployeeID, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        // TODO: move this to seperate class, this will make validation easier
        this.email = email;
    }
}

export default Employee;
