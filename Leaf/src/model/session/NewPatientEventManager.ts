// TODO: This can be removed in time - right now we're leaving it here as a refernece

// class NewPatientEventManager {
//     public static readonly inst = new NewPatientEventManager();

//     private constructor() {}

//     public async newPatientEventSubmitted(patient: Patient, event: PatientEvent): Promise<boolean> {
//         const dataObject = PatientEventDataObject.create(event);
//         return DatabaseSession.inst.addUniqueToArray(
//             DatabaseCollection.Patients,
//             patient.mrn.toString(),
//             PatientField.Events,
//             dataObject.data,
//         );
//     }
// }

// export default NewPatientEventManager;
