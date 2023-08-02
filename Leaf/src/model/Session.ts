import StateManager from "../state/publishers/StateManager";
import EmployeeID from "./employee/EmployeeID";
import Worker from "./employee/Worker";
import Hospital from "./hospital/Hospital";
import MedicalUnit from "./hospital/MedicalUnit";
import Ward from "./hospital/Ward";
import MRN from "./patient/MRN";
import Patient from "./patient/Patient";
import PatientEvent from "./patient/PatientEvent";
import { PatientEventCategory } from "./patient/PatientEventCategory";
import { PatientSex } from "./patient/PatientSex";
import TriageCase from "./triage/TriageCase";
import { TriageCode } from "./triage/TriageCode";

class Session {
    public static readonly inst = new Session();

    private workerStore: { [key: string]: Worker } = {};
    private patientStore: { [key: string]: Patient } = {};
    private hospitalStore: { [key: string]: Hospital } = {};
    // The patient currently being previewed within app (any screen)
    private activePatient: Patient | null = null;

    private constructor() {}

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

    public getAllHospitals(): Hospital[] {
        return Object.values(this.hospitalStore);
    }

    public fetchAllWorkers() {
        // TODO: Asyncronously access database and update workerStore
        // Temporary:
        const worker1 = new Worker(
            new EmployeeID("123-123"),
            "Spongebob",
            "Squarepants",
            "spongebob@gmail.com",
            new Hospital("Monash Hospital"),
        );
        const worker2 = new Worker(
            new EmployeeID("456-456"),
            "Charith",
            "Jayasekara",
            "charith.jayasekara@monash.edu",
            new Hospital("Prince Alfred Hospital"),
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
            PatientSex.Male,
            "0420696969",
            new TriageCase(
                new Date(),
                new Ward("Ward123"),
                new Hospital("Hosptial123"),
                new MedicalUnit("MedicalUnit123"),
                "Some triage text. Bla bla bla.",
                TriageCode.Immediate,
            ),
            "1234",
            new Date(),
            new EmployeeID("123-123"),
            [new PatientEvent(new Date(), "Take medication", "Take them drugs", PatientEventCategory.Medication)],
        );
        const patient2 = new Patient(
            new MRN("temp-222-222"),
            new Date(),
            "Gordon",
            "Ramsey",
            "0471308217",
            PatientSex.Male,
            new TriageCase(
                new Date(),
                new Ward("Ward456"),
                new Hospital("Hosptial456"),
                new MedicalUnit("MedicalUnit456"),
                "Some triage text. Bla bla bla.",
                TriageCode.SemiUrgent,
            ),
            "1234",
            new Date(),
            new EmployeeID("456-456"),
            [new PatientEvent(new Date(), "Eat pizza", "Yum Yum Yum", PatientEventCategory.Other)],
        );
        this.patientStore[patient1.mrn.toString()] = patient1;
        this.patientStore[patient2.mrn.toString()] = patient2;
        // Notify subscribers
        StateManager.patientsFetched.publish();
    }

    public fetchAllHospitals() {
        const hospital1 = new Hospital("Monash Hospital");
        const hospital2 = new Hospital("Prince Alfred Hospital");
        this.hospitalStore[hospital1.name] = hospital1;
        this.hospitalStore[hospital2.name] = hospital2;
        StateManager.hospitalsFetched.publish();
    }
}

export default Session;
