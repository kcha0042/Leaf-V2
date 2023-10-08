import { DatabaseCollection } from "../database/DatabaseCollection";
import DatabaseSession from "../database/DatabaseSession";
import Account from "../model/account/Account";
import Admin from "../model/employee/Admin";
import EmployeeID from "../model/employee/EmployeeID";
import Leader from "../model/employee/Leader";
import Worker from "../model/employee/Worker";
import MRN from "../model/patient/MRN";
import Patient from "../model/patient/Patient";
import { PatientSex } from "../model/patient/PatientSex";
import Session from "../model/session/Session";
import TriageCase from "../model/triage/TriageCase";
import { TriageCode } from "../model/triage/TriageCode";
import { Hospitals } from "../preset_data/Hospitals";
import { MedicalUnits } from "../preset_data/MedicalUnits";
import { Wards } from "../preset_data/Wards";

export const setupDemo = async () => {
    await DatabaseSession.inst.deleteCollection(DatabaseCollection.Workers);
    await DatabaseSession.inst.deleteCollection(DatabaseCollection.Leaders);
    await DatabaseSession.inst.deleteCollection(DatabaseCollection.Patients);
    await DatabaseSession.inst.deleteCollection(DatabaseCollection.Admins);
    await DatabaseSession.inst.deleteCollection(DatabaseCollection.Accounts);

    const worker1 = new Worker(
        new EmployeeID("w"),
        "Antony",
        "Loose",
        "antony.loose@gmail.com",
        Hospitals["H1"],
        true
    );

    const worker2 = new Worker(
        EmployeeID.generate(),
        "Mia",
        "Garcia",
        "mia.garcia@gmail.com",
        Hospitals["H2"],
        true
    );

    const worker3 = new Worker(
        EmployeeID.generate(),
        "Oliver",
        "Robin",
        "oliver.robin@gmail.com",
        Hospitals["H3"],
        true
    );

    await Session.inst.submitNewWorker(worker1);
    await Session.inst.submitNewWorker(worker2);
    await Session.inst.submitNewWorker(worker3);
    await Session.inst.activateNewAccount(new Account(worker1.id, "worker"));
    await Session.inst.activateNewAccount(new Account(worker2.id, "worker"));
    await Session.inst.activateNewAccount(new Account(worker3.id, "worker"));

    const admin = new Admin(
        new EmployeeID("a"),
        "Alex",
        "Zhou",
        "alex.zhou@gmail.com",
        Hospitals["H1"],
        true
    );

    await Session.inst.submitNewAdmin(admin);
    await Session.inst.activateNewAccount(new Account(admin.id, "admin"));

    const leader1 = new Leader(
        new EmployeeID("l"),
        "Joel",
        "Yang",
        "joel.yang@gmail.com",
        Hospitals["H1"],
        true
    );

    const leader2 = new Leader(
        EmployeeID.generate(),
        "Jacob",
        "Gonz",
        "jacob.gonz@gmail.com",
        Hospitals["H2"],
        true
    );

    const leader3 = new Leader(
        EmployeeID.generate(),
        "Emma",
        "Lopez",
        "emma.lopez@gmail.com",
        Hospitals["H3"],
        true
    );
    
    await Session.inst.submitNewLeader(leader1);
    await Session.inst.submitNewLeader(leader2);
    await Session.inst.submitNewLeader(leader3);
    await Session.inst.activateNewAccount(new Account(leader1.id, "leader"));
    await Session.inst.activateNewAccount(new Account(leader2.id, "leader"));
    await Session.inst.activateNewAccount(new Account(leader3.id, "leader"));

    const patient1 = Patient.new(
        new MRN("4529-7684-0291"),
        new Date("1982-08-25"),
        "John",
        "Doe",
        PatientSex.male,
        "0428472940",
        TriageCase.new(
            Wards["W1"],
            Hospitals["H1"],
            MedicalUnits["M1"],
            "Feelings of extreme sadness, worthlessness, and hopelessness for the past 3 months. She mentions experiencing insomnia and a lack of appetite.",
            TriageCode.semiUrgent
        ),
        "3182",
        worker1.id
    );

    const patient2 = Patient.new(
        new MRN("1253-8976-5487"),
        new Date("1990-01-10"),
        "Jane",
        "Smith",
        PatientSex.female,
        "0412345678",
        TriageCase.new(
            Wards["W2"],
            Hospitals["H2"],
            MedicalUnits["M2"],
            "Experiencing panic attacks daily and has trouble leaving the house.",
            TriageCode.urgent
        ),
        "3101",
        worker1.id
    );
    
    const patient3 = Patient.new(
        new MRN("9874-3256-1122"),
        new Date("1975-04-12"),
        "Alice",
        "Brown",
        PatientSex.female,
        "0412987654",
        TriageCase.new(
            Wards["W1"],
            Hospitals["H3"],
            MedicalUnits["M3"],
            "Reports of auditory hallucinations and feeling paranoid.",
            TriageCode.emergency
        ),
        "3205",
        worker2.id
    );
    
    const patient4 = Patient.new(
        new MRN("6548-9321-8765"),
        new Date("1988-11-05"),
        "Bob",
        "Williams",
        PatientSex.male,
        "0401234567",
        TriageCase.new(
            Wards["W2"],
            Hospitals["H1"],
            MedicalUnits["M1"],
            "Has been feeling very anxious especially in social situations.",
            TriageCode.semiUrgent
        ),
        "3108",
        worker2.id
    );
    
    const patient5 = Patient.new(
        new MRN("2389-8746-5123"),
        new Date("1972-09-15"),
        "Charlie",
        "Jones",
        PatientSex.male,
        "0409876543",
        TriageCase.new(
            Wards["W3"],
            Hospitals["H3"],
            MedicalUnits["M2"],
            "Has persistent thoughts of self-harm, needs immediate attention.",
            TriageCode.emergency
        ),
        "3155",
        worker2.id
    );
    
    const patient6 = Patient.new(
        new MRN("8423-6512-9834"),
        new Date("2000-02-28"),
        "Diana",
        "Taylor",
        PatientSex.female,
        "0412340987",
        TriageCase.new(
            Wards["W1"],
            Hospitals["H2"],
            MedicalUnits["M3"],
            "Struggling with eating and has a fear of gaining weight.",
            TriageCode.urgent
        ),
        "3199",
        worker3.id
    );
    
    const patient7 = Patient.new(
        new MRN("5234-9801-7654"),
        new Date("1995-06-03"),
        "Ethan",
        "Miller",
        PatientSex.male,
        "0408765432",
        TriageCase.new(
            Wards["W3"],
            Hospitals["H1"],
            MedicalUnits["M1"],
            "Experiencing mood swings and periods of intense depression.",
            TriageCode.semiUrgent
        ),
        "3122",
        worker3.id
    );
    
    const patient8 = Patient.new(
        new MRN("1002-8765-4390"),
        new Date("1985-12-22"),
        "Fiona",
        "Wilson",
        PatientSex.female,
        "0411122334",
        TriageCase.new(
            Wards["W2"],
            Hospitals["H2"],
            MedicalUnits["M2"],
            "Constant fatigue and loss of interest in daily activities.",
            TriageCode.nonUrgent
        ),
        "3166",
        worker3.id
    );

    await Session.inst.submitTriage(patient1);
    await Session.inst.submitTriage(patient2);
    await Session.inst.submitTriage(patient3);
    await Session.inst.submitTriage(patient4);
    await Session.inst.submitTriage(patient5);
    await Session.inst.submitTriage(patient6);
    await Session.inst.submitTriage(patient7);
    await Session.inst.submitTriage(patient8);
    
};
