import UUID from "../core/UUID";
import Ward from "./Ward";

class Hospital {
    public readonly id: UUID;
    public readonly name: string;

    constructor(name: string) {
        this.id = UUID.generate();
        this.name = name;
    }
}

export default Hospital;
