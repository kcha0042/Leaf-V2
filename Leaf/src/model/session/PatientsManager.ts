import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import PatientDataObject from "../../database/PatientDataObject";
import { compactMap } from "../../language/functions/CompactMap";
import MRN from "../patient/MRN";
import Patient from "../patient/Patient";

class PatientsManager {
    public static readonly inst = new PatientsManager();

    private constructor() {}

    public async getPatients(): Promise<Patient[]> {
        const patientDataObjects = await DatabaseSession.inst.readCollection(DatabaseCollection.Patients);
        return compactMap(patientDataObjects, (data) => PatientDataObject.restore(data));
    }

    public async getPatient(mrn: MRN): Promise<Patient | null> {
        const dataObject = await DatabaseSession.inst.read(DatabaseCollection.Patients, mrn.toString());
        if (!dataObject) {
            return null;
        }
        return PatientDataObject.restore(dataObject);
    }
}

export default PatientsManager;
