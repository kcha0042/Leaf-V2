import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import PatientDataObject from "../../database/PatientDataObject";
import Patient from "../patient/Patient";

class NewTriageManager {
    public static readonly inst = new NewTriageManager();

    private constructor() {}

    public newTriageSubmitted(patient: Patient) {
        // When the user completes the triage form, they create a new Patient
        // instance.
        //
        // In the future if we support triaging the same patient more than once,
        // we'll look for the patient's MRN in the database. If we find them,
        // we'll append the triage case to their data. Otherwise, we'll
        // create a new patient in the database.
        //
        // For now, we support only one triage per patient, so every triage
        // submission creates a new patient.

        const dataObject = PatientDataObject.create(patient);
        DatabaseSession.inst.insertOne(DatabaseCollection.Patients, dataObject.data, patient.mrn.toString());
    }
}

export default NewTriageManager;
