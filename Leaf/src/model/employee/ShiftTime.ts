import { strings } from "../../localisation/Strings";

export class ShiftTime {
    public static morning = new ShiftTime("MORNING");
    public static afternoon = new ShiftTime("AFTERNOON");
    public static night = new ShiftTime("AFTERNOON");

    public readonly id: string;

    constructor(id: string) {
        this.id = id.toUpperCase();
    }

    public matches(other: ShiftTime) {
        return this.id == other.id;
    }

    public toString(): string {
        if (this.matches(ShiftTime.morning)) {
            return strings("role.admin");
        }
        if (this.matches(ShiftTime.afternoon)) {
            return strings("role.leader");
        }
        if (this.matches(ShiftTime.night)) {
            return strings("role.worker");
        }
        return strings("unknown");
    }
}
