class MedicalUnit {
    public readonly id: string;
    public readonly group: string;
    public readonly name: string;

    constructor(id: string, name: string, group: string) {
        this.id = id;
        this.name = name;
        this.group = group;
    }
}

export default MedicalUnit;
