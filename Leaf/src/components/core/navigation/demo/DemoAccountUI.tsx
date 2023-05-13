import { LeafAccountUI, LeafSideBarItem } from "../LeafAppInterfaces";
import { YourPatients, Patients, NewTriage, YourAccount, SideBarScreen, SidebarItemWrapper } from "./DemoScreens";
import { createLeafScreen, createLeafSidebarItem, createLeafStack } from "../impl/RenderStack";
import { createLeafAccountUI } from "../CreateAccountUI";
import { dummyPatients } from "./DemoPatients";
import { StackNavigationProp } from "@react-navigation/stack";

type PatientsStackParamList = {
    "Patients": undefined; 
    "Patient": undefined; 
}

export type PatientsNavigationProp = StackNavigationProp<PatientsStackParamList, 'Patients'>

const createDemoUI = (): LeafAccountUI => {
    // stacks
    enum NurseUIStacks {
        YourPatients = "Your Patients",
        Patients = "Patients",
        NewTriage = "New Triage",
        YourAccount = "Your Account",
    }
    
    // Your patients stack
    enum YourPatientScreens {
        FormEntry = "Form Entry"
    }

    const yourPatientsScreen1 = createLeafScreen(YourPatientScreens.FormEntry, YourPatients);
    const yourPatientStack = createLeafStack(NurseUIStacks.YourPatients, YourPatientScreens.FormEntry, [yourPatientsScreen1], "clipboard-outline", "clipboard-account-outline");
    
    // Patients stack
    enum PatientScreens {
        Patients = "Patients",
        Patient = "Patient"
    }
    
    const items: LeafSideBarItem[] = [] 
    dummyPatients.forEach(patient => items.push(createLeafSidebarItem(SidebarItemWrapper(patient), () => null, patient.firstName)))
    
    const patientsScreen1 = createLeafScreen(PatientScreens.Patients, SideBarScreen)
    const patientsScreen2 = createLeafScreen(PatientScreens.Patient, Patients);
    const patientsStack = createLeafStack(NurseUIStacks.Patients, PatientScreens.Patients, [patientsScreen1, patientsScreen2], "clipboard-outline", "clipboard-account-outline", {}, items, true);
    
    // New triage stack
    enum NewTriageScreens {
        NewTriage = "New Triage Screen"
    }
    const newTriageScreen1 = createLeafScreen(NewTriageScreens.NewTriage, NewTriage);
    const newTriageStack = createLeafStack(NurseUIStacks.NewTriage, NewTriageScreens.NewTriage, [newTriageScreen1], "clipboard-outline", "clipboard-account-outline");
    
    // Your account stack
    enum YourAccountScreens {
        YourAccount = "Your Account Screen"
    }
    const yourAccountScreen1 = createLeafScreen(YourAccountScreens.YourAccount, YourAccount);
    const yourAccountStack = createLeafStack(NurseUIStacks.YourAccount, YourAccountScreens.YourAccount, [yourAccountScreen1], "clipboard-outline", "clipboard-account-outline");

    return createLeafAccountUI([yourPatientStack, patientsStack, newTriageStack, yourAccountStack], "Nurse UI")
}

// demo sidebar two

export const NurseUI = createDemoUI();