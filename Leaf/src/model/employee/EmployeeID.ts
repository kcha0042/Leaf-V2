import ID from "../core/ID";
import UUID from "../core/UUID";

class EmployeeID extends ID {
    constructor(code: string) {
        // TODO: Validation
        super(code);
    }

    public static generate(): EmployeeID {
        // TODO: Implement actual generation
        const length = 6;
        const max = Math.pow(10, length) - 1;
        const randomNum = Math.floor(Math.random() * (max + 1));
        return new EmployeeID(randomNum.toString().padStart(length, "0"));
    }

    public matches(other: EmployeeID): boolean {
        return this.toString() == other.toString();
    }
}

export default EmployeeID;
