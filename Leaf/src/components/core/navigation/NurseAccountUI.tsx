import React from "react";
import { LeafAccountUI } from "./Types";
import { DemoNavigation, YourPatients, Patients, NewTriage, YourAccount, ScrollableScreen } from "./DemoScreens";
import { createLeafScreen, createLeafStack } from "./RenderStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// stacks
enum NurseUIStacks {
    YourPatients = "Your Patients",
    Patients = "Patients",
    NewTriage = "New Triage",
    YourAccount = "Your Account",
    DemoNavigation = "Demo Navigation"
}

// Your patients stack
enum YpScreens {
    FormEntry = "Form Entry"
}
const ypScreen1 = createLeafScreen(YpScreens.FormEntry, YourPatients);
const ypStack = createLeafStack(NurseUIStacks.YourPatients, YpScreens.FormEntry, [ypScreen1], "clipboard-outline", "clipboard-account-outline");

// Patients stack
enum PScreens {
    Patients = "Patients Screen"
}
const pScreen1 = createLeafScreen(PScreens.Patients, Patients);
const pStack = createLeafStack(NurseUIStacks.Patients, PScreens.Patients, [pScreen1], "clipboard-outline", "clipboard-account-outline");

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

// Scrollable screen stack
//! You should use the enum defined for the screens in a stack when calling navigation.navigate(string)
enum sScreens {
    DemoNavigation = "Demo Navigation",
    Scrollable = "Scrollable Screen"
}

// Create param list for stack
//! You should replace undefined with the route params the screen will take in e.g. T
type ScrollableStackParamList = {
    "Demo Navigation": undefined;
    "Scrollable Screen": undefined; 
}

// This allows for type checking, you should define this for each screen
export type DemoNavigationNavigationProp = NativeStackNavigationProp<ScrollableStackParamList, 'Demo Navigation'>

const sScreen1 = createLeafScreen(sScreens.DemoNavigation, DemoNavigation);
const sScreen2 = createLeafScreen(sScreens.Scrollable, ScrollableScreen, { headerLargeTitle: true });
const sStack = createLeafStack(NurseUIStacks.DemoNavigation, sScreens.DemoNavigation, [sScreen1, sScreen2], "clipboard-outline", "clipboard-account-outline");

export const NurseUI: LeafAccountUI = {
    name: "Nurse UI",
    stacks: [ypStack, pStack, ntStack, yaStack, sStack]
};