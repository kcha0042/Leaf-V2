import { strings } from "../../../../localisation/Strings";
import LeafStack from "../../../core/navigation/LeafStack";
import NewTriageScreen from "../../NewTriageScreen";
import PatientPreviewScreen from "../../PatientPreviewScreen";
import YourPatientsScreen from "../../YourPatientsScreen";

export const YourPatientsStack = new LeafStack(
    strings("tabBar.worker.yourPatients"),
    "home-outline",
    "home",
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