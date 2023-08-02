import EmployeeID from "../employee/EmployeeID";
import TriageCase from "../triage/TriageCase";
import MRN from "./MRN";
import PatientEvent from "./PatientEvent";
import { PatientSex } from "./PatientSex";

class Patient {
    protected _mrn: MRN;
    protected _dob: Date;
    protected _firstName: string;
    protected _lastName: string;
    protected _sex: PatientSex;
    public readonly triageCase: TriageCase;
    protected _postCode: string;
    protected _timeLastAllocated: Date;
    protected _allocatedTo: EmployeeID;
    protected _events: PatientEvent[];
    get mrn(): MRN {
        return this._mrn;
    }
    get dob(): Date {
        return this._dob;
    }
    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
    get sex(): PatientSex {
        return this._sex;
    }
    get postCode(): string {
        return this._postCode;
    }
    get timeLastAllocated(): Date {
        return this._timeLastAllocated;
    }
    get idAllocatedTo(): EmployeeID {
        return this._allocatedTo;
    }
    get events(): PatientEvent[] {
        return this._events;
    }

    constructor(
        mrn: MRN,
        dob: Date,
        firstName: string,
        lastName: string,
        sex: PatientSex,
        triageCase: TriageCase,
        postCode: string,
        timeLastAllocated: Date,
        allocatedTo: EmployeeID,
        events: PatientEvent[],
    ) {
        this._mrn = mrn;
        this._dob = dob;
        this._firstName = firstName;
        this._lastName = lastName;
        this._sex = sex;
        this.triageCase = triageCase;
        this._postCode = postCode;
        this._timeLastAllocated = timeLastAllocated;
        this._allocatedTo = allocatedTo;
        this._events = events;
    }
}

export default Patient;
