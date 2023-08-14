import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import { PatientField } from "../../database/PatientDataObject";
import PatientEventDataObject from "../../database/PatientEventDataObject";
import Patient from "../patient/Patient";
import PatientEvent from "../patient/PatientEvent";

class NewPatientEventManager {
    public static readonly inst = new NewPatientEventManager();

    private constructor() {}

    public async newPatientEventSubmitted(patient: Patient, event: PatientEvent): Promise<boolean> {
        const dataObject = PatientEventDataObject.create(event);
        return DatabaseSession.inst.addUniqueToArray(
            DatabaseCollection.Patients,
            patient.mrn.toString(),
            PatientField.Events,
            dataObject.data,
        );
    }
}

export default NewPatientEventManager;
