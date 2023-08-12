import { Hospitals } from "../../preset_data/Hospitals";
import StateManager from "../../state/publishers/StateManager";
import Employee from "../employee/Employee";
import EmployeeID from "../employee/EmployeeID";
import Worker from "../employee/Worker";
import MRN from "../patient/MRN";
import Patient from "../patient/Patient";
import GetPatientsManager from "./GetPatientsManager";
import GetWorkersManager from "./GetWorkersManager";
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
    private workerStore: { [key: string]: Worker } = {};
    // All patients (continuously updated from database fetches) [MRN: Patient]
    private patientStore: { [key: string]: Patient } = {};
    // The patient currently being previewed within app (any screen)
    private activePatient: Patient | null = null;

    public get loggedInAccount(): Employee {
        return this._loggedInAccount;
    }

    private constructor() {}

    public async submitTriage(patient: Patient): Promise<boolean> {
        return NewTriageManager.inst.newTriageSubmitted(patient);
    }

    public setLoggedInAccount(employee: Employee) {
        this._loggedInAccount = employee;
    }

    public setActivePatient(patient: Patient | null) {
        this.activePatient = patient;
        StateManager.activePatientChanged.publish();
    }

    public getActivePatient(): Patient | null {
        return this.activePatient;
    }

    public getAllWorkers(): Worker[] {
        return Object.values(this.workerStore);
    }

    public getWorker(id: EmployeeID): Worker | null {
        return this.workerStore[id.toString()] || null;
    }

    public getAllPatients(): Patient[] {
        return Object.values(this.patientStore);
    }

    public getPatient(id: MRN): Patient | null {
        return this.patientStore[id.toString()] || null;
    }

    public async fetchAllWorkers() {
        // Restore workers from the database
        const workers = await GetWorkersManager.inst.getWorkers();
        for (const worker of workers) {
            this.workerStore[worker.id.toString()] = worker;
        }
        // Notify subscribers
        StateManager.workersFetched.publish();
    }

    public async fetchAllPatients() {
        const patients = await GetPatientsManager.inst.getPatients();
        for (const patient of patients) {
            // No duplicates due to use of dictionary
            this.patientStore[patient.mrn.toString()] = patient;
        }
        // Notify subscribers that patients have been fetched
        StateManager.patientsFetched.publish();
    }
}

export default Session;
