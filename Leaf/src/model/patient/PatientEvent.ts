import { PatientEventCategory } from "./PatientEventCategory";
import UUID from "../core/UUID";

class PatientEvent {
    public readonly id: UUID;
    public readonly triggerTime: Date;
    public readonly title: string;
    public readonly description: string;
    public readonly category: PatientEventCategory;

    constructor(triggerTime: Date, title: string, description: string, category: PatientEventCategory) {
        this.id = UUID.generate();
        this.triggerTime = triggerTime;
        this.title = title;
        this.description = description;
        this.category = category;
    }
}

export default PatientEvent;
