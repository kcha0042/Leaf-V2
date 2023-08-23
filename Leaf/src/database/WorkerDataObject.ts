import EmployeeID from "../model/employee/EmployeeID";
import Worker from "../model/employee/Worker";
import MRN from "../model/patient/MRN";
import { Hospitals } from "../preset_data/Hospitals";
import DataObject from "./DataObject";

export enum WorkerField {
    ID = "id",
    FirstName = "firstName",
    LastName = "lastName",
    Email = "email",
    CurrentHospitalID = "currentHospitalId",
    AllocatedPatients = "allocatedPatients",
    AccountActivated = "accountActivated",
    Password = "password",
}

class WorkerDataObject {
    public static create(worker: Worker): DataObject {
        return new DataObject()
            .addString(WorkerField.ID, worker.id.toString())
            .addString(WorkerField.FirstName, worker.firstName)
            .addString(WorkerField.LastName, worker.lastName)
            .addString(WorkerField.Email, worker.email)
            .addString(WorkerField.CurrentHospitalID, worker.currentHospital?.id?.toString())
            .addBoolean(WorkerField.AccountActivated, worker.accountActivated)
            .addStringArray(
                WorkerField.AllocatedPatients,
                worker.allocatedPatients.map((mrn) => mrn.toString()),
            )
            .addString(WorkerField.Password, worker.password);
    }

    public static restore(data: DataObject): Worker | null {
        const id = data.getStringOrNull(WorkerField.ID);
        const firstName = data.getStringOrNull(WorkerField.FirstName);
        const lastName = data.getStringOrNull(WorkerField.LastName);
        const email = data.getStringOrNull(WorkerField.Email);
        const currentHospitalID = data.getStringOrNull(WorkerField.CurrentHospitalID);
        const allocatedPatients = data.getStringArrayOrNull(WorkerField.AllocatedPatients);
        const accountActivated = data.getBooleanOrNull(WorkerField.AccountActivated);
        const password = data.getStringOrNull(WorkerField.Password);
        if (!id || !firstName || !lastName || !allocatedPatients || accountActivated == null) {
            // NB: email and current hospital are allowed to be null
            console.error("[WorkerDataObject] Failed to restore Worker");
            return null;
        }
        return new Worker(
            new EmployeeID(id),
            firstName,
            lastName,
            email,
            currentHospitalID == null ? null : Hospitals[currentHospitalID],
            accountActivated,
            allocatedPatients.map((data) => new MRN(data)),
            password,
        );
    }
}

export default WorkerDataObject;
