import ID from "./ID";
import {v4 as uuidv4} from 'uuid';

class UUID extends ID {

    private readonly uuid: uuidv4;

    constructor(uuid: uuidv4) {
        super(uuid);
        this.uuid = uuid;
    }

    public static generate(): UUID {
        return new UUID(uuidv4());
    }

    public matches(other: UUID): boolean {
        return this.uuid == other.uuid;
    }

}

export default UUID;