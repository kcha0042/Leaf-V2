import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";
import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";

class Worker extends Employee {
    public readonly role: Role = Role.Worker;
    protected _allocatedPatients: MRN[];

    // Had to add a constructor to serialise Worker class
    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string,
        currentHospital: Hospital,
        allocatedPatients: MRN[],
    ) {
        super(id, firstName, lastName, email, currentHospital);
        this._allocatedPatients = allocatedPatients;
    }

    get allocatedPatients(): MRN[] {
        return this._allocatedPatients.slice();
    }
}

export default Worker;
