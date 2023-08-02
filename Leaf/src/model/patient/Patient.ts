import EmployeeID from "../employee/EmployeeID";
import TriageCase from "../triage/TriageCase";
import MRN from "./MRN";
import PatientEvent from "./PatientEvent";

class Patient {
    protected _mrn: MRN;
    protected _dob: Date;
    protected _firstName: string;
    protected _lastName: string;
    public readonly triageCase: TriageCase;
    protected _postCode: string;
    protected _timeLastAllocated: Date;
    protected _allocatedTo: EmployeeID;
    protected _events: PatientEvent[];
    protected _sessionAllocated?: string;
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
    get sessionAllocated(): string {
        return this._sessionAllocated;
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
        sessionAllocated?: string,
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
        this._sessionAllocated = sessionAllocated;
    }
}

export default Patient;
