import UUID from "../core/UUID";
import Ward from "./Ward";

class Hospital {

    public readonly id: UUID;
    public readonly name: string;
    public readonly wards: Ward[];

    constructor(name: string, wards: Ward[]) {
        this.id = UUID.generate();
        this.name = name;
        this.wards = wards;
    }

}

export default Hospital;