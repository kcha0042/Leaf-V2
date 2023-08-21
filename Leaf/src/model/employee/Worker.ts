import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";
import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";

class Worker extends Employee {
    public readonly role: Role = Role.worker;
    protected _allocatedPatients: MRN[];

    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string | null,
        currentHospital: Hospital | null,
        allocatedPatients: MRN[],
    ) {
        super(id, firstName, lastName, email, currentHospital);
        this._allocatedPatients = allocatedPatients;
    }

    public static new(firstName: string, lastName: string): Worker {
        return new Worker(EmployeeID.generate(), firstName, lastName, null, null, []);
    }

    get allocatedPatients(): MRN[] {
        return this._allocatedPatients.slice();
    }
}

export default Worker;
