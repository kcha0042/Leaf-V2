import Employee from "./Employee";
import MRN from "../patient/MRN";
import { Role } from "./Role";
import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";
import Patient from "../patient/Patient";

class Worker extends Employee {
    public readonly role: Role = Role.worker;
    protected _allocatedPatients: MRN[];

    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string | null,
        currentHospital: Hospital | null,
        accountActivated: boolean,
        allocatedPatients: MRN[],
    ) {
        super(id, firstName, lastName, email, currentHospital, accountActivated);
        this._allocatedPatients = allocatedPatients;
    }

    public static new(firstName: string, lastName: string, hospital: Hospital | null): Worker {
        return new Worker(EmployeeID.generate(), firstName, lastName, null, hospital, false, []);
    }

    get allocatedPatients(): MRN[] {
        return this._allocatedPatients.slice();
    }

    public allocatePatient(patient: Patient) {
        this._allocatedPatients.push(patient.mrn);
    }

    public deallocatePatient(mrn: MRN) {
        this.allocatedPatients.forEach((value: MRN, index: number) => {
            if (value.matches(mrn)) {
                this._allocatedPatients.splice(index, 1);
            }
        });
    }
}

export default Worker;
