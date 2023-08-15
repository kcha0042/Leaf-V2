import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import PatientDataObject from "../../database/PatientDataObject";
import MRN from "../patient/MRN";
import Patient from "../patient/Patient";

class GetPatientsManager {
    public static readonly inst = new GetPatientsManager();

    private constructor() {}

    public async getPatients(): Promise<Patient[]> {
        const patientDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Patients);
        return patientDataObjects.map((data) => PatientDataObject.restore(data));
    }

    public async getPatient(mrn: MRN): Promise<Patient | null> {
        const dataObject = await DatabaseSession.inst.read(DatabaseCollection.Patients, mrn.toString());
        return PatientDataObject.restore(dataObject);
    }
}

export default GetPatientsManager;
