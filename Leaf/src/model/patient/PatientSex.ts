import { strings } from "../../localisation/Strings";

export class PatientSex {
    public static male = new PatientSex("MALE");
    public static female = new PatientSex("FEMALE");
    public static other = new PatientSex("OTHER");

    public readonly id: string;

    constructor(id: string) {
        this.id = id.toUpperCase();
    }

    public matches(other: PatientSex) {
        return this.id == other.id;
    }

    public toString(): string {
        if (this.matches(PatientSex.male)) {
            return strings("sex.male");
        }
        if (this.matches(PatientSex.female)) {
            return strings("sex.female");
        }
        if (this.matches(PatientSex.other)) {
            return strings("sex.other");
        }
        return strings("unknown");
    }
}
