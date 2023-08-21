import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

abstract class Employee {
    public readonly id: EmployeeID;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string | null;
    public currentHospital: Hospital | null;
    public abstract readonly role: Role;
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string | null,
        currentHospital: Hospital | null,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email; // TODO: move this to seperate class, this will make validation easier
        this.currentHospital = currentHospital;
    }
}

export default Employee;
