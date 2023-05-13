import { strings } from "../../../../localisation/Strings";
import Session from "../../../../model/Session";
import LeafStack from "../../../core/navigation/LeafStack";
import PatientPreviewScreen from "../../PatientPreviewScreen";
import PatientsScreen from "../../PatientsScreen";

export const PatientsStack = new LeafStack(
    strings("tabBar.worker.patients"),
    "account-injury-outline",
    "account-injury",
)
.addNewScreen(
    strings("header.worker.patients"),
    "PATIENTS",
    PatientsScreen,
)
.addNewScreen(
    strings("header.worker.patientPreview"),
    "PATIENT_PREVIEW",
    PatientPreviewScreen,
);