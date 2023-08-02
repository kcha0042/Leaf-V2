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
    "button.edit": "edit",
    "button.allocate": "New Allocation",
    "button.deleteAccount": "Remove Account",
    "button.viewPatient": "View",
    "button.patientActions": "Actions",
    "button.editPatient": "Edit",
    "button.deletePatient": "Remove",
    "button.activateAccount": "Activate Account",
    "button.activate": "Activate",

    // Login
    "login.title": "Login",
    "login.activateAccount": "Activate Account",

    // Operations
    "operation.removeAccount": "This will remove this account and all associated data",

    // Labels
    "label.id": "ID: ",
    "label.loading": "Loading",
    "label.details": "Details",
    "label.viewPatient": "View patient information and medical history.",
    "label.patientActions": "View immediate actions relevant to triage.",
    "label.editPatient": "Edit patient information and triage.",
    "label.removePatient": "Delete patient from the system.",
    "label.done": "Exit patient options.",
    "label.hospital": "Hospital",
    "label.rememberMe": "Remember Me",
    "label.editHospital": "Edit hospital",
    "label.editName": "Edit name",
    "label.editEmail": "Edit email",
    "label.enterPassword": "Enter password",

    // Input Labels
    "inputLabel.username": "Username",
    "inputLabel.password": "Password",
    "inputLabel.setPassword": "Set Password",
    "inputLabel.confirmPassword": "Confirm Password",
    "inputLabel.givenName": "Name",
    "inputLabel.surname": "Surname",
    "inputLabel.mrn": "MRN",
    "inputLabel.postcode": "Postcode",
    "inputLabel.email": "Email",
    "inputLabel.triageCode": "Triage Code",
    "inputLabel.triageDescription": "Triage Description",

    // Error
    "error.hospitalExists": "Hospital does not exist",
    "error.incorrectPassword": "Incorrect password",

    // Triage Form
    "triageForm.title.identity": "Patient Identity",
    "triageForm.title.triage": "Triage",

    // Patient History
    "patientHistory.title.identity": "Identity",
    "patientHistory.title.bio": "Bio",
    "patientHistory.title.triage": "Triage case",
    "patientHistory.title.events": "Events",

    // TODO: some of these strings have already been created, should I use the other ones even though the label doesnt really make sense?
    "patientHistory.descriptor.name": "Name",
    "patientHistory.descriptor.mrn": "MRN",
    "patientHistory.descriptor.postcode": "Postcode",
    "patientHistory.descriptor.dob": "DOB",
    "patientHistory.descriptor.sex": "Sex",
    "patientHistory.descriptor.code": "Code",
    "patientHistory.descriptor.arrivalDate": "Arrival date",
    "patientHistory.descriptor.arrivalWard": "Arrival ward",
    "patientHistory.descriptor.dischargeDate": "Discharge date",
    "patientHistory.descriptor.dischargeWard": "Discharge ward",
    "patientHistory.descriptor.hospital": "Hospital",
    "patientHistory.descriptor.medicalUnit": "Medical Unit",
    "patientHistory.descriptor.category": "Category",
    "patientHistory.descriptor.triggerTime": "Trigger time",

    // Actions
    "actions.emergency": "Emergency",
    "actions.call": "Call",
    "actions.steps": "Steps",
    "actions.department": "Department",

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
