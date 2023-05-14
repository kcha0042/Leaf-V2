import { strings } from "../../../../localisation/Strings";
import EmployeeID from "../../../../model/employee/EmployeeID";
import Hospital from "../../../../model/hospital/Hospital";
import MedicalUnit from "../../../../model/hospital/MedicalUnit";
import Ward from "../../../../model/hospital/Ward";
import MRN from "../../../../model/patient/MRN";
import Patient from "../../../../model/patient/Patient";
import PatientEvent from "../../../../model/patient/PatientEvent";
import { PatientEventCategory } from "../../../../model/patient/PatientEventCategory";
import TriageCase from "../../../../model/triage/TriageCase";
import { TriageCode } from "../../../../model/triage/TriageCode";
import LeafSidebarItem from "../../../core/navigation/LeafSidebarItem";
import LeafStack from "../../../core/navigation/LeafStack";
import { PatientCardWrapper } from "../../components/PatientCard";
import PatientPreviewScreen from "../../PatientPreviewScreen";
import YourPatientsScreen from "../../YourPatientsScreen";

// TODO: have to think of how to create sidebar when fetching items is async
// I just recreated the patients in the db for now to show that it works
const dummyPatients = [
    new Patient(
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
    ),

    new Patient(
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
    )
];

// Create side bar items
const patientsSideBarItems: LeafSidebarItem[] = dummyPatients.map(patient => {
    return new LeafSidebarItem(
        PatientCardWrapper(patient),
        () => null, // TODO
        patient.fullName
    )
})

export const YourPatientsStack = new LeafStack(
    strings("tabBar.worker.yourPatients"),
    "home-outline",
    "home",
    patientsSideBarItems,
    true,
)
.addNewScreen(
    strings("header.worker.yourPatients"),
    "YOUR_PATENTS",
    YourPatientsScreen,
)
.addNewScreen(
    strings("header.worker.patientPreview"),
    "PATIENT_PREVIEW",
    PatientPreviewScreen,
);