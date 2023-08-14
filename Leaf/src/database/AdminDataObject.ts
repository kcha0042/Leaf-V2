import Admin from "../model/employee/Admin";
import EmployeeID from "../model/employee/EmployeeID";
import { Hospitals } from "../preset_data/Hospitals";
import DataObject from "./DataObject";

export enum AdminField {
    ID = "id",
    FirstName = "firstName",
    LastName = "lastName",
    Email = "email",
    CurrentHospitalID = "currentHospitalId",
}

class AdminDataObject {
    public static create(admin: Admin): DataObject {
        return new DataObject()
            .addString(AdminField.ID, admin.id.toString())
            .addString(AdminField.FirstName, admin.firstName)
            .addString(AdminField.LastName, admin.lastName)
            .addString(AdminField.Email, admin.email)
            .addString(AdminField.CurrentHospitalID, admin.currentHospital.id.toString());
    }

    public static restore(data: DataObject): Admin {
        const id = data.getString(AdminField.ID);
        const firstName = data.getString(AdminField.FirstName);
        const lastName = data.getString(AdminField.LastName);
        const email = data.getString(AdminField.Email);
        const currentHospitalID = data.getString(AdminField.CurrentHospitalID);
        return new Admin(new EmployeeID(id), firstName, lastName, email, Hospitals[currentHospitalID]);
    }
}

export default AdminDataObject;
