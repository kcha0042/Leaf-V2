import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";
import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";
import Patient from "../patient/Patient";

class Worker extends Employee {
    public readonly role: Role = Role.worker;

    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string | null,
        currentHospital: Hospital | null,
        accountActivated: boolean,
    ) {
        super(id, firstName, lastName, email, currentHospital, accountActivated);
    }

    public static new(firstName: string, lastName: string, hospital: Hospital | null): Worker {
        return new Worker(EmployeeID.generate(), firstName, lastName, null, hospital, false);
    }
}

export default Worker;
