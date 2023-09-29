import Hospital from "../hospital/Hospital";
import EmployeeID from "./EmployeeID";
import { Role } from "./Role";

abstract class Employee {
    public readonly id: EmployeeID;
    protected _firstName: string;
    protected _lastName: string;
    protected _email: string | null;
    protected _currentHospital: Hospital | null;
    protected _accountActivated: boolean;
    public abstract readonly role: Role;
    public get firstName(): string {
        return this._firstName;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public get email(): string | null {
        return this._email;
    }
    public set email(email: string | null) {
        this._email = email;
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

    constructor(
        id: EmployeeID,
        firstName: string,
        lastName: string,
        email: string | null,
        currentHospital: Hospital | null,
        accountActivated: boolean,
    ) {
        this.id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._currentHospital = currentHospital;
        this._accountActivated = accountActivated;
    }

    public setFirstName(firstName: string) {
        this._firstName = firstName;
    }

    public setLastName(lastName: string) {
        this._lastName = lastName;
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
}

export default Employee;
