import { strings } from "../../localisation/Strings";

export class ShiftTime {
    // Morning shift, 7am - 3pm
    public static morning = new ShiftTime("MORNING");
    // Afternoon shift, 3pm - 11pm
    public static afternoon = new ShiftTime("AFTERNOON");
    // Night shift, 11pm - 7am
    public static night = new ShiftTime("NIGHT");
    // None, not allocated to a shift
    public static none = new ShiftTime("NONE");

    public readonly id: string;

    constructor(id: string) {
        this.id = id.toUpperCase();
    }

    public static getCurrent(time: Date = new Date()): ShiftTime {
        const hour = time.getHours();

        if (hour >= 7 && hour <15) {
            return ShiftTime.morning;
        }
        else if (hour >=15 && hour <23) {
            return ShiftTime.afternoon;
        }
        return ShiftTime.night;
    }

    public matches(other: ShiftTime) {
        return this.id == other.id;
    }

    public toString(): string {
        if (this.matches(ShiftTime.morning)) {
            return strings("shiftTime.morning");
        }
        if (this.matches(ShiftTime.afternoon)) {
            return strings("shiftTime.afternoon");
        }
        if (this.matches(ShiftTime.night)) {
            return strings("shiftTime.night");
        }
        if (this.matches(ShiftTime.none)) {
            return strings("shiftTime.none");
        }
        return strings("unknown");
    }
}
