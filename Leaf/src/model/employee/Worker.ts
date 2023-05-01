import Employee from "./Employee";
import MRN from "../patient/MRN";

class Worker extends Employee {

    private _allocatedPatients: MRN[];

    get allocatedPatients(): MRN[] {
        return this._allocatedPatients.slice();
    }

}

export default Worker;