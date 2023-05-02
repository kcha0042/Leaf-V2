import EmployeeID from "../employee/EmployeeID";
import MRN from "./MRN";
import PatientEvent from "./PatientEvent";
import UUID from "../core/UUID";
import TriageCase from "../triage/TriageCase";

class Patient {

    private _mrn: MRN;
    private _dob: Date;
    private _firstName: string;
    private _lastName: string;
    public readonly triageCase: TriageCase;
    private _postCode: string;
    private _timeLastAllocated: Date;
    private _allocatedTo: EmployeeID;
    private _events: PatientEvent[];
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
        return `${this._firstName} ${this._lastName}`
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
        this.triageCase = triageCase;
        this._postCode = postCode;
        this._timeLastAllocated = timeLastAllocated;
        this._allocatedTo = allocatedTo;
        this._events = events;
    }

}

export default Patient;