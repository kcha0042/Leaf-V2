import EmployeeID from "../employee/EmployeeID";

class Account {
    public readonly id: EmployeeID;
    protected _password: string;

    constructor(id: EmployeeID, password: string) {
        this.id = id;
        this._password = password;
    }

    public get password(): string {
        return this._password;
    }

    public setPassword(password: string) {
        this._password = password;
    }
}

export default Account;
