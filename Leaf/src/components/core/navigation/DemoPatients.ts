import EmployeeID from "../../../model/employee/EmployeeID";
import Hospital from "../../../model/hospital/Hospital";
import MedicalUnit from "../../../model/hospital/MedicalUnit";
import Ward from "../../../model/hospital/Ward";
import MRN from "../../../model/patient/MRN";
import Patient from "../../../model/patient/Patient";
import PatientEvent from "../../../model/patient/PatientEvent";
import { PatientEventCategory } from "../../../model/patient/PatientEventCategory";
import TriageCase from "../../../model/triage/TriageCase";
import { TriageCode } from "../../../model/triage/TriageCode";

// I just need these for testing, can't use session as I create the items outside of a component and therefore cannot use useState.
let patient1 = new Patient(
    new MRN("temp-111-111"),
    new Date(),
    "Tony",
    "Stark",
    new TriageCase(
        new Date(),
        new Ward("Ward123"),
        new Hospital("Hosptial123"),
        new MedicalUnit("MedicalUnit123"),
        "Some triage text. Bla bla bla.",
        TriageCode.immediate
    ),
    "1234",
    new Date(),
    new EmployeeID("123-123"),
    [
        new PatientEvent(
            new Date(),
            "Take medication",
            "Take them drugs",
            PatientEventCategory.medication
        )
    ]
);

let patient2 = new Patient(
    new MRN("temp-222-222"),
    new Date(),
    "Gordon",
    "Ramsey",
    new TriageCase(
        new Date(),
        new Ward("Ward456"),
        new Hospital("Hosptial456"),
        new MedicalUnit("MedicalUnit456"),
        "Some triage text. Bla bla bla.",
        TriageCode.semiUrgent
    ),
    "1234",
    new Date(),
    new EmployeeID("456-456"),
    [
        new PatientEvent(
            new Date(),
            "Eat pizza",
            "Yum Yum Yum",
            PatientEventCategory.other
        )
    ]
);

export const dummyPatients = [patient1, patient2];