import AccountDataObject from "../../database/AccountDataObject";
import { DatabaseCollection } from "../../database/DatabaseCollection";
import DatabaseSession from "../../database/DatabaseSession";
import Account from "../account/Account";
import EmployeeID from "../employee/EmployeeID";


class AccountsManager {
    public static readonly inst = new AccountsManager();

    private constructor() {}

    public async getAccount(id: EmployeeID): Promise<Account | null> {
        const dataObject = await DatabaseSession.inst.read(DatabaseCollection.Accounts, id.toString());
        if (!dataObject) {
            return null;
        }
        return AccountDataObject.restore(dataObject);
    }

    public async newAccountCreated(account: Account): Promise<boolean> {
        const dataObject = AccountDataObject.create(account);
        return DatabaseSession.inst.insertOne(DatabaseCollection.Accounts, dataObject.data, account.id.toString());
    }

    public async updateAccount(account: Account): Promise<boolean> {
        const dataObject = AccountDataObject.create(account);
        return DatabaseSession.inst.update(DatabaseCollection.Accounts, account.id.toString(), dataObject.data);
    }
}

export default AccountsManager;
