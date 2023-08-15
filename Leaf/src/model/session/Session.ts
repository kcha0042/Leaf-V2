import { Hospitals } from "../../preset_data/Hospitals";
import StateManager from "../../state/publishers/StateManager";
import ValidateUtil from "../../utils/ValidateUtil";
import Employee from "../employee/Employee";
import EmployeeID from "../employee/EmployeeID";
import Worker from "../employee/Worker";
import MRN from "../patient/MRN";
import Patient from "../patient/Patient";
import PatientEvent from "../patient/PatientEvent";
import GetPatientsManager from "./GetPatientsManager";
import GetWorkersManager from "./GetWorkersManager";
import NewPatientEventManager from "./NewPatientEventManager";
import NewTriageManager from "./NewTriageManager";

class Session {
    public static readonly inst = new Session();

    // TODO: Right now we just set a logged in class
    // In the future, we need to find the account that logged in and set it here
    private _loggedInAccount: Employee = new Worker(
        EmployeeID.generate(),
        "Veritably",
        "Clean",
        "mr.clean@email.com",
        Hospitals["H1"],
        [],
    );
    // ALl workers (continuously updated from database fetches) [ID: Worker]
    private _workerStore: { [key: string]: Worker } = {};
    // All patients (continuously updated from database fetches) [MRN: Patient]
    private _patientStore: { [key: string]: Patient } = {};
    // The mrn of the patient currently being previewed within app (any screen)
    private _activePatientMRN: MRN | null = null;

    public get loggedInAccount(): Employee {
        return this._loggedInAccount;
    }

    private constructor() {}

    public async submitTriage(patient: Patient): Promise<boolean> {
        return NewTriageManager.inst.newTriageSubmitted(patient);
    }

    public async submitPatientEvent(event: PatientEvent): Promise<boolean> {
        if (!this._activePatientMRN) {
            console.error("[SESSION] Failed to submit patient event - active patient is null");
            return false;
        }
        const activePatient = this.getActivePatient();
        const success = NewPatientEventManager.inst.newPatientEventSubmitted(activePatient, event);
        if (success) {
            // If we successfully submitted the event, re-fetch them from the database
            // This keeps Session up to date with the latest patient instance
            this.fetchPatient(activePatient.mrn);
        }
        return success;
    }

    public setLoggedInAccount(employee: Employee) {
        this._loggedInAccount = employee;
    }

    public setActivePatient(patient: Patient | null) {
        this._activePatientMRN = patient.mrn;
        StateManager.activePatientChanged.publish();
    }

    public getActivePatient(): Patient | null {
        return this._patientStore[this._activePatientMRN.toString()] ?? null;
    }

    public getAllWorkers(): Worker[] {
        return Object.values(this._workerStore);
    }

    public getWorker(id: EmployeeID): Worker | null {
        return this._workerStore[id.toString()] || null;
    }

    public getAllPatients(): Patient[] {
        return Object.values(this._patientStore);
    }

    public getPatient(id: MRN): Patient | null {
        return this._patientStore[id.toString()] || null;
    }

    public async fetchAllWorkers() {
        // Restore workers from the database
        const workers = await GetWorkersManager.inst.getWorkers();
        for (const worker of workers) {
            this._workerStore[worker.id.toString()] = worker;
        }
        // Notify subscribers
        StateManager.workersFetched.publish();
    }

    public async fetchWorker(id: EmployeeID) {
        const worker = await GetWorkersManager.inst.getWorker(id);
        if (ValidateUtil.valueIsDefined(worker)) {
            this._workerStore[worker.id.toString()] = worker;
        }
        // Notify subscribers
        StateManager.workersFetched.publish();
    }

    public async fetchAllPatients() {
        const patients = await GetPatientsManager.inst.getPatients();
        for (const patient of patients) {
            // No duplicates due to use of dictionary
            this._patientStore[patient.mrn.toString()] = patient;
        }
        // Notify subscribers that patients have been fetched
        StateManager.patientsFetched.publish();
    }

    public async fetchPatient(mrn: MRN) {
        const patient = await GetPatientsManager.inst.getPatient(mrn);
        if (ValidateUtil.valueIsDefined(patient)) {
            this._patientStore[patient.mrn.toString()] = patient;
        }
        // Notify subscribers
        StateManager.patientsFetched.publish();
    }
}

export default Session;
