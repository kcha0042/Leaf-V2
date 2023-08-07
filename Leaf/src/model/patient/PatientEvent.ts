import { PatientEventCategory } from "./PatientEventCategory";
import UUID from "../core/UUID";

class PatientEvent {
    public readonly id: UUID;
    public readonly triggerTime: Date;
    public readonly title: string;
    public readonly description: string;
    public readonly category: PatientEventCategory;

    constructor(id: UUID, triggerTime: Date, title: string, description: string, category: PatientEventCategory) {
        this.id = id;
        this.triggerTime = triggerTime;
        this.title = title;
        this.description = description;
        this.category = category;
    }

    public static new(
        triggerTime: Date,
        title: string,
        description: string,
        category: PatientEventCategory,
    ): PatientEvent {
        return new PatientEvent(UUID.generate(), triggerTime, title, description, category);
    }
}

export default PatientEvent;
