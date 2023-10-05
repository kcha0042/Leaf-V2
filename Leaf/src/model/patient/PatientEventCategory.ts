import { strings } from "../../localisation/Strings";

export class PatientEventCategory {
    public static medication = new PatientEventCategory("DRUG EXPOSURE");
    public static visit = new PatientEventCategory("VISIT OCCURRENCE");
    public static condition = new PatientEventCategory("CONDITION OCCURRENCE");
    public static procedure = new PatientEventCategory("PROCEDURE OCCURRENCE");
    public static device = new PatientEventCategory("DEVICE EXPOSURE");
    public static measurement = new PatientEventCategory("MEASUREMENT");
    public static observation = new PatientEventCategory("OBSERVATION");
    public static episode = new PatientEventCategory("EPISODE");
    public static note = new PatientEventCategory("NOTE");

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
        if (this.matches(PatientEventCategory.visit)) {
            return strings("patientEventCategory.visit");
        }
        if (this.matches(PatientEventCategory.condition)) {
            return strings("patientEventCategory.condition");
        }
        if (this.matches(PatientEventCategory.procedure)) {
            return strings("patientEventCategory.procedure");
        }
        if (this.matches(PatientEventCategory.device)) {
            return strings("patientEventCategory.device");
        }
        if (this.matches(PatientEventCategory.measurement)) {
            return strings("patientEventCategory.measurement");
        }
        if (this.matches(PatientEventCategory.observation)) {
            return strings("patientEventCategory.observation");
        }
        if (this.matches(PatientEventCategory.episode)) {
            return strings("patientEventCategory.episode");
        }
        if (this.matches(PatientEventCategory.note)) {
            return strings("patientEventCategory.note");
        }
        return strings("unknown");
    }
}
