import React from "react";
import { LeafAccountUI, LeafSideBarItem } from "./Types";
import { YourPatients, Patients, NewTriage, YourAccount, SideBarScreen, SidebarItemWrapper } from "./DemoScreens";
import { createLeafScreen, createLeafStack } from "./RenderStack";

// stacks
enum NurseUIStacks {
    YourPatients = "Your Patients",
    Patients = "Patients",
    NewTriage = "New Triage",
    YourAccount = "Your Account",
    DemoNavigation = "Demo Navigation",
    DemoSideBar = "Demo Sidebar"
}

// Your patients stack
enum YpScreens {
    FormEntry = "Form Entry"
}
const ypScreen1 = createLeafScreen(YpScreens.FormEntry, YourPatients);
const ypStack = createLeafStack(NurseUIStacks.YourPatients, YpScreens.FormEntry, [ypScreen1], "clipboard-outline", "clipboard-account-outline");

// Patients stack
enum PScreens {
    Patients = "Patients",
    Patient = "Patient"
}

const arr = [...Array(10).keys()]
const items: LeafSideBarItem[] = [] 
arr.forEach(num => items.push({ component: SidebarItemWrapper(num), passProps: () => null }))

const pScreen1 = createLeafScreen(PScreens.Patients, SideBarScreen)
const pScreen2 = createLeafScreen(PScreens.Patient, Patients);
const pStack = createLeafStack(NurseUIStacks.Patients, PScreens.Patients, [pScreen1, pScreen2], "clipboard-outline", "clipboard-account-outline", {}, items);

// New triage stack
enum NtScreens {
    NewTriage = "New Triage Screen"
}
const ntScreen1 = createLeafScreen(NtScreens.NewTriage, NewTriage);
const ntStack = createLeafStack(NurseUIStacks.NewTriage, NtScreens.NewTriage, [ntScreen1], "clipboard-outline", "clipboard-account-outline");

// Your account stack
enum YaScreens {
    YourAccount = "Your Account Screen"
}
const yaScreen1 = createLeafScreen(YaScreens.YourAccount, YourAccount);
const yaStack = createLeafStack(NurseUIStacks.YourAccount, YaScreens.YourAccount, [yaScreen1], "clipboard-outline", "clipboard-account-outline");

// demo sidebar two

export const NurseUI: LeafAccountUI = {
    name: "Nurse UI",
    stacks: [ypStack, pStack, ntStack, yaStack]
};