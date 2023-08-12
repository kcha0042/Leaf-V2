import EmployeeID from "../model/employee/EmployeeID";
import Leader from "../model/employee/Leader";
import { Hospitals } from "../preset_data/Hospitals";
import DataObject from "./DataObject";

class LeaderDataObject {
    public static create(leader: Leader): DataObject {
        return new DataObject()
            .addString("id", leader.id.toString())
            .addString("firstName", leader.firstName)
            .addString("lastName", leader.lastName)
            .addString("email", leader.email)
            .addString("currentHospitalID", leader.currentHospital.id.toString());
    }

    public static restore(data: DataObject): Leader {
        const id = data.getString("id");
        const firstName = data.getString("firstName");
        const lastName = data.getString("lastName");
        const email = data.getString("email");
        const currentHospitalID = data.getString("currentHospitalID");
        return new Leader(new EmployeeID(id), firstName, lastName, email, Hospitals[currentHospitalID]);
    }
}

export default LeaderDataObject;
