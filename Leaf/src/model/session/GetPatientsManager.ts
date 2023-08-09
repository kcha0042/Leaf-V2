import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import PatientDataObject from "../../database/PatientDataObject";
import Patient from "../patient/Patient";

class GetPatientsManager {
    public static readonly inst = new GetPatientsManager();

    private constructor() {}

    public async getPatients(): Promise<Patient[]> {
        const patientDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Patients);
        return patientDataObjects.map((data) => PatientDataObject.restore(data));
    }
}

export default GetPatientsManager;
