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
    AccountActivated = "accountActivated",
    Password = "password"
}

class AdminDataObject {
    public static create(admin: Admin): DataObject {
        return new DataObject()
            .addString(AdminField.ID, admin.id.toString())
            .addString(AdminField.FirstName, admin.firstName)
            .addString(AdminField.LastName, admin.lastName)
            .addString(AdminField.Email, admin.email)
            .addString(AdminField.CurrentHospitalID, admin.currentHospital?.id?.toString())
            .addBoolean(AdminField.AccountActivated, admin.accountActivated)
            .addString(AdminField.Password, admin.password);
    }

    public static restore(data: DataObject): Admin | null {
        const id = data.getStringOrNull(AdminField.ID);
        const firstName = data.getStringOrNull(AdminField.FirstName);
        const lastName = data.getStringOrNull(AdminField.LastName);
        const email = data.getStringOrNull(AdminField.Email);
        const currentHospitalID = data.getStringOrNull(AdminField.CurrentHospitalID);
        const accountActivated = data.getBooleanOrNull(AdminField.AccountActivated);
        const password = data.getStringOrNull(AdminField.Password);
        if (!id || !firstName || !lastName || accountActivated == null) {
            // NB: email and current hospital are allowed to be null
            console.error("[AdminDataObject] Failed to restore Admin");
            return null;
        }
        return new Admin(
            new EmployeeID(id),
            firstName,
            lastName,
            email,
            currentHospitalID == null ? null : Hospitals[currentHospitalID],
            accountActivated,
            password,
        );
    }
}

export default AdminDataObject;
