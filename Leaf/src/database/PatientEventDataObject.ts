import UUID from "../model/core/UUID";
import PatientEvent from "../model/patient/PatientEvent";
import { PatientEventCategory } from "../model/patient/PatientEventCategory";
import DataObject from "./DataObject";

export enum PatientEventField {
    ID = "id",
    TriggerTime = "triggerTime",
    Title = "title",
    Description = "description",
    Category = "category",
}

class PatientEventDataObject {
    public static create(event: PatientEvent): DataObject {
        return new DataObject()
            .addString(PatientEventField.ID, event.id.toString())
            .addDate(PatientEventField.TriggerTime, event.triggerTime)
            .addString(PatientEventField.Title, event.title)
            .addString(PatientEventField.Description, event.description)
            .addString(PatientEventField.Category, event.category.id);
    }

    public static restore(data: DataObject): PatientEvent {
        const id = data.getString(PatientEventField.ID);
        const triggerTime = data.getDate(PatientEventField.TriggerTime);
        const title = data.getString(PatientEventField.Title);
        const description = data.getString(PatientEventField.Description);
        const category = data.getString(PatientEventField.Category);
        return new PatientEvent(new UUID(id), triggerTime, title, description, new PatientEventCategory(category));
    }
}

export default PatientEventDataObject;
