import { strings } from "../../localisation/Strings";

export class PatientEventCategory {
    public static medication = new PatientEventCategory("MEDICATION");
    public static other = new PatientEventCategory("OTHER");

    public readonly id: string;

    constructor(id: string) {
        this.id = id.toUpperCase();
    }

    public matches(other: PatientEventCategory) {
        return this.id == other.id;
    }

    public toString(): string {
        if (this.matches(PatientEventCategory.medication)) {
            return strings("patientEventCategory.medication");
        }
        if (this.matches(PatientEventCategory.other)) {
            return strings("patientEventCategory.other");
        }
        return strings("unknown");
    }
}
