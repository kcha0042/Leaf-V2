import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";

class Worker extends Employee {
    public readonly role: Role = Role.Worker;
    protected _allocatedPatients: MRN[];

    get allocatedPatients(): MRN[] {
        return this._allocatedPatients.slice();
    }
}

export default Worker;
