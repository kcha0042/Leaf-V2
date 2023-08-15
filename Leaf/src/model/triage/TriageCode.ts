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

    public getSteps(): string[] {
        if (this.matches(TriageCode.immediate)) {
            return [
                strings("triageCodeSteps.immediate.1"),
                strings("triageCodeSteps.immediate.2"),
                strings("triageCodeSteps.immediate.3"),
                strings("triageCodeSteps.immediate.4"),
            ];
        }
        if (this.matches(TriageCode.emergency)) {
            return [
                strings("triageCodeSteps.emergency.1"),
                strings("triageCodeSteps.emergency.2"),
                strings("triageCodeSteps.emergency.3"),
                strings("triageCodeSteps.emergency.4", TriageCode.immediate.code.toString()),
            ];
        }
        if (this.matches(TriageCode.urgent)) {
            return [
                strings("triageCodeSteps.urgent.1"),
                strings("triageCodeSteps.urgent.2"),
                strings("triageCodeSteps.urgent.3"),
                strings("triageCodeSteps.urgent.4"),
                strings("triageCodeSteps.urgent.5"),
            ];
        }
        if (this.matches(TriageCode.semiUrgent)) {
            return [
                strings("triageCodeSteps.semiUrgent.1"),
                strings("triageCodeSteps.semiUrgent.2"),
                strings("triageCodeSteps.semiUrgent.3"),
            ];
        }
        if (this.matches(TriageCode.nonUrgent)) {
            return [strings("triageCodeSteps.nonUrgent.1"), strings("triageCodeSteps.nonUrgent.2")];
        }
        return [];
    }
}
