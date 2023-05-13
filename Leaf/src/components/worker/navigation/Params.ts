import { StackNavigationProp } from "@react-navigation/stack";

type PatientsStackParamList = {
    "YOUR_PATIENTS": undefined; 
    "PATIENT_PREVIEW": undefined; 
}

export type PatientsNavigationProp = StackNavigationProp<PatientsStackParamList, "YOUR_PATIENTS">