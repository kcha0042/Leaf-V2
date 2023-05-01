import ID from "../core/ID";
import UUID from "../core/UUID";

class EmployeeID extends ID {

    constructor(code: string) {
        // TODO: Validation
        super(code);
    }

    public static generate(): EmployeeID {
        // TODO: Implement actual generation
        return new EmployeeID(UUID.generate().toString());
    }

    public matches(other: EmployeeID): boolean {
        return this.toString() == other.toString();
    }

}

export default EmployeeID;