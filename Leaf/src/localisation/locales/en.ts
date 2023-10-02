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
    unknown: "Unknown",

    // Navigation
    "navigation.noScreen": "No item selected",

    // Worker Tab Bar
    "tabBar.worker.yourPatients": "Home",
    "tabBar.worker.newTriage": "Triage",
    "tabBar.worker.events": "Dashboard",
    "tabBar.worker.account": "Account",

    // Admin Tab Bar
    "tabBar.admin.nurses": "Nurses",
    "tabBar.admin.leaders": "Leaders",
    "tabBar.admin.new": "New",
    "tabBar.admin.export": "Export",

    // Leader Tab Bar
    "tabBar.leader.viewNurses": "Nurses",
    "tabBar.leader.viewPatients": "Patients",
    "tabBar.leader.account": "Account",

    // Worker Headers
    "header.worker.newTriage": "New Triage",
    "header.worker.events": "Events Dashboard",
    "header.worker.patients": "Patients",
    "header.worker.account": "Your Account",
    "header.worker.addEvent": "Add Event",
    "header.worker.view1Param": "{0} History",
    "header.worker.actions1Param": "Code {0} Responses",
    "header.worker.edit1Param": "Edit {0}",
    "header.worker.changelog1Param": "{0} Changelog",

    // Admin Headers
    "header.admin.manageNurses": "Home",
    "header.admin.viewNurses": "Nurses",
    "header.admin.viewLeaders": "Leaders",
    "header.admin.newAccount": "New Account",
    "header.admin.exportPatient": "Export Patient",

    // Leader Headers
    "header.leader.viewNurses": "Nurses",
    "header.leader.viewPatients": "Patients",
    "header.leader.allocatePatient": "Allocate Patient",
    "header.leader.nurses": "Nurses",
    "header.leader.allocateTo": "Allocate Nurse To {0}",
    "header.leader.account": "Your Account",

    // Buttons
    "button.login": "Login",
    "button.logout": "Logout",
    "button.done": "Done",
    "button.cancel": "Cancel",
    "button.newAllocation": "New Allocation",
    "button.allocate": "Allocate",
    "button.allocated": "Allocated",
    "button.edit": "edit",
    "button.deleteAccount": "Remove Account",
    "button.createAccount": "Create Account",
    "button.viewPatient": "View",
    "button.patientActions": "Actions",
    "button.editPatient": "Edit",
    "button.deletePatient": "Remove",
    "button.morning": "Morning",
    "button.noon": "Noon",
    "button.afternoon": "Afternoon",
    "button.none": "None",
    "button.code.1": "1",
    "button.code.2": "2",
    "button.code.3": "3",
    "button.code.4": "4",
    "button.code.5": "5",
    "button.selectAnOption": "Select an option",
    "button.deallocate": "DEALLOCATE",
    "button.activateAccount": "Activate Account",
    "button.activate": "Activate",
    "button.clear": "Clear",
    "button.submit": "Submit",
    "button.addEvent": "Add Event",
    "button.exportPatient": "Export Patient",
    "button.changelog": "Changelog",

    // Login
    "login.title": "Login",
    "login.activateAccount": "Activate Account",

    // Operations
    "operation.removeAccount": "This will remove this account and all associated data",
    "operation.activeAccount":
        "To activate the account and set the password, select 'Activate Account' on the login page.",

    // Labels
    "label.id": "ID: ",
    "label.date": "Date: ",
    "label.lastAllocated": "Last Allocated: {0} Shift",
    "label.notAllocated": "Last Allocated: None",
    "label.loading": "Loading",
    "label.details": "Details",
    "label.viewPatient": "View patient information and medical history.",
    "label.patientActions": "View immediate actions relevant to triage.",
    "label.editPatient": "Edit patient information and triage.",
    "label.removePatient": "Delete patient from the system.",
    "label.addEvent": "Add a scheduled event for the patient.",
    "label.done": "Exit patient options.",
    "label.patientAllocateToNurse": "Select patients to allocate to",
    "label.allocateToPatient": "Allocate nurse to",
    "label.hospital": "Hospital",
    "label.rememberMe": "Remember Me",
    "label.editHospital": "Edit hospital",
    "label.editName": "Edit name",
    "label.editEmail": "Edit email",
    "label.enterPassword": "Enter password",
    "label.allocated": "Allocated",
    "label.all": "All",
    "label.category": "Category",
    "label.selectRole": "Select Role",
    "label.enterName": "Enter Name",
    "label.accountCreated": "Account Created",
    "label.anErrorOccurred": "An error occurred",
    "label.noEvents": "No Events",
    "label.accountCreated1Param": "{0} Account Created",
    "label.changelog": "View the edit history of the patient.",

    // Input Labels
    "inputLabel.username": "Username",
    "inputLabel.providedUsername": "Assigned Username",
    "inputLabel.password": "Password",
    "inputLabel.setPassword": "Set Password",
    "inputLabel.confirmPassword": "Confirm Password",
    "inputLabel.givenName": "Name",
    "inputLabel.surname": "Surname",
    "inputLabel.mrn": "MRN",
    "inputLabel.postcode": "Postcode",
    "inputLabel.email": "Email",
    "inputLabel.setEmail": "Set Email",
    "inputLabel.triageCode": "Triage Code",
    "inputLabel.triageDescription": "Triage Description",
    "inputLabel.dob": "Date of Birth",
    "inputLabel.dateFormat": "DD/MM/YYYY",
    "inputLabel.timeFormat": "HH:MM - 24hr",
    "inputLabel.hopsital": "Hospital Site",
    "inputLabel.ward": "Ward",
    "inputLabel.medicalUnit": "Medical Unit",
    "inputLabel.required": "Required",
    "inputLabel.sex": "Sex",
    "inputLabel.phone": "Phone Number",
    "inputLabel.title": "Title",
    "inputLabel.description": "Description",
    "inputLabel.triggerTime": "Trigger Time",
    "inputLabel.category": "Category",

    // Triage Form
    "triageForm.title.identity": "Patient Identity",
    "triageForm.title.triage": "Triage",
    "triageForm.title.hospitalisation": "Hospitalisation",
    "triageForm.title.end": "End of Form",

    // Patient History
    "patientHistory.title.identity": "Identity",
    "patientHistory.title.bio": "Bio",
    "patientHistory.title.triage": "Triage Case",
    "patientHistory.title.events": "Events",

    // TODO: some of these strings have already been created, should I use the other ones even though the label doesnt really make sense?
    "patientHistory.descriptor.name": "Name",
    "patientHistory.descriptor.mrn": "MRN",
    "patientHistory.descriptor.postcode": "Postcode",
    "patientHistory.descriptor.dob": "Date of Birth",
    "patientHistory.descriptor.sex": "Sex",
    "patientHistory.descriptor.code": "Code",
    "patientHistory.descriptor.triageText": "Description",
    "patientHistory.descriptor.arrivalDate": "Arrival date",
    "patientHistory.descriptor.arrivalWard": "Arrival ward",
    "patientHistory.descriptor.dischargeDate": "Discharge date",
    "patientHistory.descriptor.dischargeWard": "Discharge ward",
    "patientHistory.descriptor.hospital": "Hospital",
    "patientHistory.descriptor.medicalUnit": "Medical Unit",
    "patientHistory.descriptor.category": "Category",
    "patientHistory.descriptor.triggerTime": "Time",

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

    // Search Bar Filters
    "searchBarFilter.time": "Time",
    "searchBarFilter.triageCode": "Code",

    // WorkerCard
    "workerCard.numPatients": "{0} Allocated",
    "workerCard.id": "ID: {0}",

    //AllocateToNurseCard
    "allocateToNurseCard.id": "ID: {0}",
    "allocateToNurseCard.date": "Date: {0}",
    "allocateToNurseCard.session": "Allocated: {0}",

    // Triage Steps
    // Immediate
    "triageCodeSteps.immediate.1": "Alert medical staff immediately",
    "triageCodeSteps.immediate.2": "Ensure constant visual surveillance",
    "triageCodeSteps.immediate.3": "Ensure adequate personnel to provide restraint",
    "triageCodeSteps.immediate.4": "Call security and/or police IF staff or patient safety is compromised",
    // Emergency
    "triageCodeSteps.emergency.1": "Alert medical staff immediately",
    "triageCodeSteps.emergency.2": "Ensure constant visual surveillance",
    "triageCodeSteps.emergency.3":
        "Ensure security in attendance to provide detention if necessary until patient is sedated",
    "triageCodeSteps.emergency.4": "If defusing techniques are unsuccessful, escalate to Code {0}",
    // Urgent
    "triageCodeSteps.urgent.1": "Close observation (regular observation at maximum of 10 minute intervals)",
    "triageCodeSteps.urgent.2": "Do not leave patient in waiting room without support staff",
    "triageCodeSteps.urgent.3": "Ensure safe environment for patient and others",
    "triageCodeSteps.urgent.4": "Inform security that patient is in department",
    "triageCodeSteps.urgent.5": "Re-triage if evidence of increasing behavioural disturbance",
    // Semi Urgent
    "triageCodeSteps.semiUrgent.1":
        "Intermittent observation (routine waiting room check at maximum of 1 hour intervals)",
    "triageCodeSteps.semiUrgent.2": "Discuss with mental health staff",
    "triageCodeSteps.semiUrgent.3": "Re-triage if evidence of increasing behavioural disturbance",
    // Non Urgent
    "triageCodeSteps.nonUrgent.1":
        "Intermittent observation (routine waiting room check at maximum of 1 hour intervals)",
    "triageCodeSteps.nonUrgent.2": "Discuss with mental health staff",

    // Roles
    "role.admin": "Admin",
    "role.leader": "Leader",
    "role.worker": "Nurse",

    // Shift Times
    "shiftTime.morning": "Morning",
    "shiftTime.afternoon": "Afternoon",
    "shiftTime.night": "Night",
    "shiftTime.none": "None",

    // Nurse Allocation Screen
    "nurseAllocationScreen.subtitle": "Patients Allocated",

    // Patient event categories
    "patientEventCategory.medication": "Medication",
    "patientEventCategory.other": "Other",

    // Sex
    "sex.male": "Male",
    "sex.female": "Female",
    "sex.other": "Other",

    // Errors
    "error.missingName": "Please enter both name and surname",
    "error.missingRole": "Please select the role",
    "error.hospitalExists": "Hospital does not exist",
    "error.incorrectPassword": "Incorrect password",
    "error.invalidDate": "Invalid date",
    "error.invalidTime": "Invalid time",

    // Changelog
    "changelog.creation": "Entered system",
    "changelog.eventCreation3Param": 'Event "{0}" created by {1} ({2})',
    "changelog.eventCompletion3Param": 'Event "{0}" marked COMPLETED by {1} ({2})',
    "changelog.eventIncompletion3Param": 'Event "{0}" marked INCOMPLETE by {1} ({2})',
    "changelog.allocation4Param": "Allocated by {0} ({1}) to nurse {2} ({3})",
    "changelog.edit2Param": "Record edited by {0} ({1})",
};
