import { Hospitals } from "../../preset_data/Hospitals";
import { MedicalUnits } from "../../preset_data/MedicalUnits";
import { Wards } from "../../preset_data/Wards";
import StateManager from "../../state/publishers/StateManager";
import Employee from "../employee/Employee";
import EmployeeID from "../employee/EmployeeID";
import Worker from "../employee/Worker";
import Hospital from "../hospital/Hospital";
import MedicalUnit from "../hospital/MedicalUnit";
import Ward from "../hospital/Ward";
import MRN from "../patient/MRN";
import Patient from "../patient/Patient";
import PatientEvent from "../patient/PatientEvent";
import { PatientEventCategory } from "../patient/PatientEventCategory";
import { PatientSex } from "../patient/PatientSex";
import TriageCase from "../triage/TriageCase";
import { TriageCode } from "../triage/TriageCode";
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

    public submitTriage(patient: Patient) {
        NewTriageManager.inst.newTriageSubmitted(patient);
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

    public fetchAllWorkers() {
        // TODO: Asyncronously access database and update workerStore
        // Temporary:
        const worker1 = new Worker(
            new EmployeeID("123-123"),
            "Spongebob",
            "Squarepants",
            "spongebob@gmail.com",
            Hospitals["H1"],
        );
        const worker2 = new Worker(
            new EmployeeID("456-456"),
            "Charith",
            "Jayasekara",
            "charith.jayasekara@monash.edu",
            Hospitals["H2"],
        );
        this.workerStore[worker1.id.toString()] = worker1;
        this.workerStore[worker2.id.toString()] = worker2;
        // Notify subscribers
        StateManager.workersFetched.publish();
    }

    public fetchAllPatients() {
        // TODO: Asyncronously access database and update patientStore
        // Temporary:
        const patient1 = new Patient(
            new MRN("temp-111-111"),
            new Date(),
            "Tony",
            "Stark",
            PatientSex.male,
            "0420696969",
            TriageCase.new(
                Wards["W1"],
                Hospitals["H1"],
                MedicalUnits["M1"],
                "Some triage text. Bla bla bla.",
                TriageCode.immediate,
            ),
            "1234",
            new Date(),
            new EmployeeID("123-123"),
            [PatientEvent.new(new Date(), "Take medication", "Take them drugs", PatientEventCategory.medication)],
        );
        const patient2 = new Patient(
            new MRN("temp-222-222"),
            new Date(),
            "Gordon",
            "Ramsey",
            PatientSex.male,
            "0471308217",
            TriageCase.new(
                Wards["W2"],
                Hospitals["H2"],
                MedicalUnits["M2"],
                "Some triage text. Bla bla bla.",
                TriageCode.semiUrgent,
            ),
            "1234",
            new Date(),
            new EmployeeID("456-456"),
            [
                PatientEvent.new(new Date(), "Eat Pizza", "Yum Yum Yum", PatientEventCategory.other),
                PatientEvent.new(new Date(), "Eat Lasagne", "Nom Nom Nom", PatientEventCategory.other),
            ],
        );
        this.patientStore[patient1.mrn.toString()] = patient1;
        this.patientStore[patient2.mrn.toString()] = patient2;
        // Notify subscribers
        StateManager.patientsFetched.publish();
    }
}

export default Session;
