import { strings } from "../../localisation/Strings";

export class TriageCode {
    public static immediate = new TriageCode(1);
    public static emergency = new TriageCode(2);
    public static urgent = new TriageCode(3);
    public static semiUrgent = new TriageCode(4);
    public static nonUrgent = new TriageCode(5);

    public readonly id: number;
    public get code(): number {
        return this.id;
    }

    constructor(id: number) {
        this.id = id;
    }

    public matches(other: TriageCode) {
        return this.id == other.id;
    }

    public toString(): string {
        if (this.matches(TriageCode.immediate)) {
            return strings("triageCode.1");
        }
        if (this.matches(TriageCode.emergency)) {
            return strings("triageCode.2");
        }
        if (this.matches(TriageCode.urgent)) {
            return strings("triageCode.3");
        }
        if (this.matches(TriageCode.semiUrgent)) {
            return strings("triageCode.4");
        }
        if (this.matches(TriageCode.nonUrgent)) {
            return strings("triageCode.5");
        }
        return strings("unknown");
    }
}
