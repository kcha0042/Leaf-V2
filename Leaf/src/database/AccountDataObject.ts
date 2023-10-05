import Account from "../model/account/Account";
import EmployeeID from "../model/employee/EmployeeID";
import DataObject from "./DataObject";

export enum AccountField {
    ID = "id",
    Password = "password",
}

class AccountDataObject {
    public static create(account: Account): DataObject {
        return new DataObject()
            .addString(AccountField.ID, account.id.toString())
            .addString(AccountField.Password, account.password);
    }

    public static restore(data: DataObject): Account | null {
        const id = data.getStringOrNull(AccountField.ID);
        const password = data.getStringOrNull(AccountField.Password);
        if (!id || password == null) {
            console.error("[AccountDataObject] Failed to restore Admin");
            return null;
        }
        return new Account(new EmployeeID(id), password);
    }
}

export default AccountDataObject;
