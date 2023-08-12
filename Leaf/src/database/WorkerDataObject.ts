import EmployeeID from "../model/employee/EmployeeID";
import Worker from "../model/employee/Worker";
import Hospital from "../model/hospital/Hospital";
import MRN from "../model/patient/MRN";
import DataObject from "./DataObject";

class WorkerDataObject {
    public static create(worker: Worker): DataObject {
        const currentHospitalData = new DataObject()
            .addString("id", worker.currentHospital.id.toString())
            .addString("code", worker.currentHospital.code.toString())
            .addString("name", worker.currentHospital.name.toString());

        const allocatedPatientsData = worker.allocatedPatients.map((mrn) => {
            return new DataObject().addString("mrn", mrn.toString());
        });

        return new DataObject()
            .addString("id", worker.id.toString())
            .addString("firstName", worker.firstName)
            .addString("lastName", worker.lastName)
            .addString("email", worker.email)
            .addObject("currentHospital", currentHospitalData)
            .addObjectArray("allocatedPatients", allocatedPatientsData);
    }

    public static restore(data: DataObject): Worker {
        const id = data.getString("id");
        const firstName = data.getString("firstName");
        const lastName = data.getString("lastName");
        const email = data.getString("email");
        const currentHospitalData = data.getDataObject("currentHospital");
        const allocatedPatientsData = data.getDataObjectArray("allocatedPatients");
        return new Worker(
            new EmployeeID(id),
            firstName,
            lastName,
            email,
            WorkerDataObject.restoreCurrentHospital(currentHospitalData),
            allocatedPatientsData.map((data) => WorkerDataObject.restoreAllocatedPatients(data)),
        );
    }

    private static restoreCurrentHospital(data: DataObject): Hospital {
        const id = data.getString("id");
        const code = data.getString("code");
        const name = data.getString("name");
        return new Hospital(id, code, name);
    }

    private static restoreAllocatedPatients(data: DataObject): MRN {
        const mrn = data.getString("mrn");
        return new MRN(mrn);
    }
}

export default WorkerDataObject;
