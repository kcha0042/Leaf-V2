class Ward {
    public readonly id: string;
    public readonly hosptialCode: string;
    public readonly name: string;

    constructor(id: string, hospitalCode: string, name: string) {
        this.id = id;
        this.hosptialCode = hospitalCode;
        this.name = name;
    }
}

export default Ward;
