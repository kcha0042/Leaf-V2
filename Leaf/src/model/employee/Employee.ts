import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

abstract class Employee {
    public readonly id: EmployeeID;
    public readonly firstName: string;
    public readonly lastName: string;
    protected _email: string | null;
    protected _currentHospital: Hospital | null;
    protected _accountActivated: boolean;
    protected _password: string | null;
    public abstract readonly role: Role;
    public get email(): string | null {
        return this._email;
    }
    public get currentHospital(): Hospital | null {
        return this._currentHospital;
    }
    public get accountActivated(): boolean {
        return this._accountActivated;
    }
    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    public get password(): string | null {
        return this._password;
    }

    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string | null,
        currentHospital: Hospital | null,
        accountActivated: boolean,
        password: string | null
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this._email = email;
        this._currentHospital = currentHospital;
        this._accountActivated = accountActivated;
        this._password = password;
    }

    public setEmail(email: string) {
        this._email = email;
    }

    public setHosptial(hospital: Hospital | null) {
        this._currentHospital = hospital;
    }

    public setAccountActivated(activated: boolean) {
        this._accountActivated = activated;
    }

    public setPassword(password: string) {
        // This should be a hashed password
        this._password = password;
    }
}

export default Employee;
