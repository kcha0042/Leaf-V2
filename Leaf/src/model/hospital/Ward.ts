import UUID from "../core/UUID";

class Ward {
    public readonly id: UUID;
    public readonly name: string;

    constructor(name: string) {
        this.id = UUID.generate();
        this.name = name;
    }
}

export default Ward;
