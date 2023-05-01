import EmployeeID from "./EmployeeID";

class Employee {

    public readonly id: EmployeeID;
    public readonly firstName: string;
    public readonly lastName: string;

    constructor(
        id: EmployeeID, 
        firstName: string, 
        lastName: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

export default Employee;