import { PatientEventCategory } from "./PatientEventCategory";
import UUID from "../core/UUID";

class PatientEvent {
    public readonly id: UUID;
    public readonly triggerTime: Date;
    public readonly title: string;
    public readonly description: string;
    public readonly category: PatientEventCategory;
    private _lastCompleted: Date;
    public get lastCompleted(): Date {
        return this._lastCompleted;
    }
    public get triggerTimeDescription(): string {
        const hours = this.triggerTime.getHours().toString().padStart(2, "0");
        const minutes = this.triggerTime.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    constructor(id: UUID, triggerTime: Date, title: string, description: string, category: PatientEventCategory, lastCompleted: Date) {
        this.id = id;
        this.triggerTime = triggerTime;
        this.title = title;
        this.description = description;
        this.category = category;
        this._lastCompleted = lastCompleted;
    }

    public static new(
        triggerTime: Date,
        title: string,
        description: string,
        category: PatientEventCategory,
    ): PatientEvent {
        return new PatientEvent(UUID.generate(), triggerTime, title, description, category, new Date(0));
    }

    public markCompleted() {
        this._lastCompleted = new Date();
    }

    public markIncomplete() {
        this._lastCompleted = new Date(0);
    }

    public occursAfter(time: Date): boolean {
        const minsIntoDay = this.triggerTime.getHours() * 60.0 + this.triggerTime.getMinutes();
        const other = time.getHours() * 60.0 + time.getMinutes();
        return minsIntoDay > other;
    }

    public completedToday(): boolean {
        const now = new Date();
        return now.getFullYear() === this.lastCompleted.getFullYear() && now.getMonth() === this.lastCompleted.getMonth() && now.getDate() === this.lastCompleted.getDate();
    }
}

export default PatientEvent;
