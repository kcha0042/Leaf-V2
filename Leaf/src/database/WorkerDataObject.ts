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
}

class WorkerDataObject {
    public static create(worker: Worker): DataObject {
        return new DataObject()
            .addString(WorkerField.ID, worker.id.toString())
            .addString(WorkerField.FirstName, worker.firstName)
            .addString(WorkerField.LastName, worker.lastName)
            .addString(WorkerField.Email, worker.email)
            .addString(WorkerField.CurrentHospitalID, worker.currentHospital.id.toString())
            .addStringArray(
                WorkerField.AllocatedPatients,
                worker.allocatedPatients.map((mrn) => mrn.toString()),
            );
    }

    public static restore(data: DataObject): Worker {
        const id = data.getString(WorkerField.ID);
        const firstName = data.getString(WorkerField.FirstName);
        const lastName = data.getString(WorkerField.LastName);
        const email = data.getString(WorkerField.Email);
        const currentHospitalID = data.getString(WorkerField.CurrentHospitalID);
        const allocatedPatients = data.getStringArray(WorkerField.AllocatedPatients);
        return new Worker(
            new EmployeeID(id),
            firstName,
            lastName,
            email,
            Hospitals[currentHospitalID],
            allocatedPatients.map((data) => new MRN(data)),
        );
    }
}

export default WorkerDataObject;
