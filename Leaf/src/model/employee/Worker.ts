import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";
import EmployeeID from "./EmployeeID";

class Worker extends Employee {
    public readonly role: Role = Role.Worker;
    protected _allocatedPatients: MRN[];

    get allocatedPatients(): MRN[] {
        return this._allocatedPatients.slice();
    }

    constructor(id: EmployeeID, firstName: string, lastName: string, allocatedPatients: MRN[]) {
        super(id, firstName, lastName);
        this._allocatedPatients = allocatedPatients;
    }
}

export default Worker;
