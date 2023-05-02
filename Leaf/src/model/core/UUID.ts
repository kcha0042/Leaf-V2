import ID from "./ID";
import uuid from 'react-native-uuid';

class UUID extends ID {

    constructor(uuid: string) {
        super(uuid);
    }

    public static generate(): UUID {
        return new UUID(uuid.v4() as string);
    }

    public matches(other: UUID): boolean {
        return this.toString() == other.toString();
    }

}

export default UUID;