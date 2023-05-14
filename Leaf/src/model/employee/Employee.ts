import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

abstract class Employee {

    public readonly id: EmployeeID;
    public readonly firstName: string;
    public readonly lastName: string;
    public abstract readonly role: Role;

    constructor(
        id: EmployeeID, 
        firstName: string, 
        lastName: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

export default Employee;