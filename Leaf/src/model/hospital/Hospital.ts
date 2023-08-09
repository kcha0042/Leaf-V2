class Hospital {
    public readonly id: string;
    public readonly code: string;
    public readonly name: string;

    constructor(id: string, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}

export default Hospital;
