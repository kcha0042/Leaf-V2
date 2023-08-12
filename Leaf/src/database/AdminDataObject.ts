import Admin from "../model/employee/Admin";
import EmployeeID from "../model/employee/EmployeeID";
import { Role } from "../model/employee/Role";
import Hospital from "../model/hospital/Hospital";
import { Hospitals } from "../preset_data/Hospitals";
import DataObject from "./DataObject";

class AdminDataObject {
    public static create(admin: Admin): DataObject {
        return new DataObject()
            .addString("id", admin.id.toString())
            .addString("firstName", admin.firstName)
            .addString("lastName", admin.lastName)
            .addString("email", admin.email)
            .addString("currentHospitalID", admin.currentHospital.id.toString());
    }

    public static restore(data: DataObject): Admin {
        const id = data.getString("id");
        const firstName = data.getString("firstName");
        const lastName = data.getString("lastName");
        const email = data.getString("email");
        const currentHospitalID = data.getString("currentHospitalID");
        return new Admin(new EmployeeID(id), firstName, lastName, email, Hospitals[currentHospitalID]);
    }
}

export default AdminDataObject;
