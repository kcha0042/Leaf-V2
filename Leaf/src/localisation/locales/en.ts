/**
 * English strings.
 *
 * For the formatting convention, refer to my (Andre Pham's) repo:
 * https://github.com/Andre-Pham/yonder/blob/main/codebase/yonder/yonder/Strings/en.lproj/Localizable.strings
 *
 * For providing parameters, insert {0}, {1}, ..., {n} into the string.
 */
export default {
    // Main
    appName: "Intake",

    // Navigation
    "navigation.noScreen": "No item selected",

    // Worker Tab Bar
    "tabBar.worker.yourPatients": "Home",
    "tabBar.worker.newTriage": "Triage",
    "tabBar.worker.patients": "Patients",
    "tabBar.worker.account": "Account",

    // Admin Tab Bar
    "tabBar.admin.nurses": "Nurses",
    "tabBar.admin.leaders": "Leaders",
    "tabBar.admin.new": "New",
    "tabBar.admin.export": "Export",

    // Leader Tab Bar
    "tabBar.leader.viewNurses": "Home",
    "tabBar.leader.viewPatients": "Patients",
    "tabBar.leader.account": "Account",

    // Worker Headers
    "header.worker.yourPatients": "Your Patients",
    "header.worker.newTriage": "New Triage",
    "header.worker.patients": "Patients",
    "header.worker.account": "Your Account",
    "header.worker.view1Param": "{0} History",
    "header.worker.actions1Param": "Code {0} Responses",
    "header.worker.edit1Param": "Edit {0}",

    // Admin Headers
    "header.admin.manageNurses": "Home",

    // Leader Headers
    "header.leader.viewNurses": "Nurses",
    "header.leader.viewPatients": "Patients",
    "header.leader.allocatePatient": "Allocate Patient",
    "header.leader.nurses": "Nurses",

    // Buttons
    "button.login": "Login",
    "button.logout": "Logout",
    "button.done": "Done",
    "button.cancel": "Cancel",
    "button.allocate": "New Allocation",
    "button.deleteAccount": "Remove Account",
    "button.viewPatient": "View",
    "button.patientActions": "Actions",
    "button.editPatient": "Edit",
    "button.deletePatient": "Remove",

    // Login
    "login.title": "Login",
    "login.inputLabel.username": "Username",
    "login.inputLabel.password": "Password",

    // Operations
    "operation.removeAccount": "This will remove this account and all associated data",

    // Labels
    "label.id": "ID: ",
    "label.loading": "Loading",
    "label.details": "Details",

    // Triage Form
    "triageForm.title.identity": "Patient Identity",
    "triageForm.title.triage": "Triage",
    "triageForm.textInput.givenName": "Name",
    "triageForm.textInput.surname": "Surname",
    "triageForm.textInput.mrn": "MRN",
    "triageForm.textInput.postcode": "Postcode",

    // Search
    "search.underlying": "Search",

    // Triage Codes
    "triageCode.none": "None",
    "triageCode.1": "Immediate",
    "triageCode.2": "Emergency",
    "triageCode.3": "Urgent",
    "triageCode.4": "Semi-Urgent",
    "triageCode.5": "Non-Urgent",
};
