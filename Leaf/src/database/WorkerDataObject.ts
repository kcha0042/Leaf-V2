import EmployeeID from "../model/employee/EmployeeID";
import Worker from "../model/employee/Worker";
import Hospital from "../model/hospital/Hospital";
import MRN from "../model/patient/MRN";
import { Hospitals } from "../preset_data/Hospitals";
import DataObject from "./DataObject";

class WorkerDataObject {
    public static create(worker: Worker): DataObject {
        return new DataObject()
            .addString("id", worker.id.toString())
            .addString("firstName", worker.firstName)
            .addString("lastName", worker.lastName)
            .addString("email", worker.email)
            .addString("currentHospitalID", worker.currentHospital.id.toString())
            .addStringArray(
                "allocatedPatients",
                worker.allocatedPatients.map((mrn) => mrn.toString()),
            );
    }

    public static restore(data: DataObject): Worker {
        const id = data.getString("id");
        const firstName = data.getString("firstName");
        const lastName = data.getString("lastName");
        const email = data.getString("email");
        const currentHospitalID = data.getString("currentHospitalID");
        const allocatedPatients = data.getStringArray("allocatedPatients");
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
