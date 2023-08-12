import Admin from "../model/employee/Admin";
import EmployeeID from "../model/employee/EmployeeID";
import { Role } from "../model/employee/Role";
import Hospital from "../model/hospital/Hospital";
import DataObject from "./DataObject";

class AdminDataObject {
    public static create(admin: Admin): DataObject {
        const currentHospitalData = new DataObject()
            .addString("id", admin.currentHospital.id.toString())
            .addString("code", admin.currentHospital.code.toString())
            .addString("name", admin.currentHospital.name.toString());

        return new DataObject()
            .addString("id", admin.id.toString())
            .addString("firstName", admin.firstName)
            .addString("lastName", admin.lastName)
            .addString("email", admin.email)
            .addObject("currentHospital", currentHospitalData);
    }

    public static restore(data: DataObject): Admin {
        const id = data.getString("id");
        const firstName = data.getString("firstName");
        const lastName = data.getString("lastName");
        const email = data.getString("email");
        const currentHospitalData = data.getDataObject("currentHospital");
        return new Admin(
            new EmployeeID(id),
            firstName,
            lastName,
            email,
            AdminDataObject.restoreCurrentHospital(currentHospitalData),
        );
    }

    private static restoreCurrentHospital(data: DataObject): Hospital {
        const id = data.getString("id");
        const code = data.getString("code");
        const name = data.getString("name");
        return new Hospital(id, code, name);
    }
}

export default AdminDataObject;
