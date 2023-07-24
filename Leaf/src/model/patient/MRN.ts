import ID from "../core/ID";

class MRN extends ID {
    constructor(code: string) {
        // TODO: Validation
        super(code);
    }

    public matches(other: MRN): boolean {
        return this.toString() == other.toString();
    }
}

export default MRN;
