import UUID from "../model/core/UUID";
import EmployeeID from "../model/employee/EmployeeID";
import PatientChangelog from "../model/patient/PatientChangelog";
import DataObject from "./DataObject";

export enum PatientChangelogField {
    CreationDate = "creationDate",
    EventCreations = "eventCreations",
    EventCompletions = "eventCompletions",
    Allocations = "allocations",
    Edits = "edits",
    Date = "date",
    EventID = "eventId",
    NurseID = "nurseId",
    EmployeeID = "allocatedById",
    Completed = "completed",
}

class PatientChangelogDataObject {
    public static create(changelog: PatientChangelog): DataObject {
        return new DataObject()
            .addDate(PatientChangelogField.CreationDate, changelog.creationDate)
            .addObjectArray(
                PatientChangelogField.EventCreations,
                changelog.eventCreations.map((eventCreation) =>
                    new DataObject()
                        .addDate(PatientChangelogField.Date, eventCreation.date)
                        .addString(PatientChangelogField.EventID, eventCreation.eventID.toString())
                        .addString(PatientChangelogField.NurseID, eventCreation.nurseID.toString()),
                ),
            )
            .addObjectArray(
                PatientChangelogField.EventCompletions,
                changelog.eventCompletions.map((eventCompletion) =>
                    new DataObject()
                        .addDate(PatientChangelogField.Date, eventCompletion.date)
                        .addString(PatientChangelogField.EventID, eventCompletion.eventID.toString())
                        .addString(PatientChangelogField.NurseID, eventCompletion.nurseID.toString())
                        .addBoolean(PatientChangelogField.Completed, eventCompletion.completed),
                ),
            )
            .addObjectArray(
                PatientChangelogField.Allocations,
                changelog.allocations.map((allocation) =>
                    new DataObject()
                        .addDate(PatientChangelogField.Date, allocation.date)
                        .addString(PatientChangelogField.EmployeeID, allocation.employeeID.toString())
                        .addString(PatientChangelogField.NurseID, allocation.nurseID.toString()),
                ),
            )
            .addObjectArray(
                PatientChangelogField.Edits,
                changelog.edits.map((edit) =>
                    new DataObject()
                        .addDate(PatientChangelogField.Date, edit.date)
                        .addString(PatientChangelogField.NurseID, edit.nurseID.toString()),
                ),
            );
    }

    public static restore(data: DataObject): PatientChangelog | null {
        const creationDate = data.getDateOrNull(PatientChangelogField.CreationDate);
        const eventCreationsData = data.getDataObjectArray(PatientChangelogField.EventCreations);
        const eventCompletionsData = data.getDataObjectArray(PatientChangelogField.EventCompletions);
        const allocationsData = data.getDataObjectArray(PatientChangelogField.Allocations);
        const editsData = data.getDataObjectArray(PatientChangelogField.Edits);

        if (!creationDate) {
            console.error("[PatientChangelogDataObject] Failed to restore PatientChangelog");
            return null;
        }

        const eventCreations = eventCreationsData
            .map((obj: DataObject) => ({
                date: obj.getDateOrNull(PatientChangelogField.Date),
                eventID: obj.getStringOrNull(PatientChangelogField.EventID),
                nurseID: obj.getStringOrNull(PatientChangelogField.NurseID),
            }))
            .filter((entry) => entry.date && entry.eventID && entry.nurseID)
            .map((entry) => ({
                date: entry.date!,
                eventID: new UUID(entry.eventID!),
                nurseID: new EmployeeID(entry.nurseID!),
            }));

        const eventCompletions = eventCompletionsData
            .map((obj: DataObject) => ({
                date: obj.getDateOrNull(PatientChangelogField.Date),
                eventID: obj.getStringOrNull(PatientChangelogField.EventID),
                nurseID: obj.getStringOrNull(PatientChangelogField.NurseID),
                completed: obj.getBooleanOrNull(PatientChangelogField.Completed),
            }))
            .filter((entry) => entry.date && entry.eventID && entry.nurseID && entry.completed != null)
            .map((entry) => ({
                date: entry.date!,
                eventID: new UUID(entry.eventID!),
                nurseID: new EmployeeID(entry.nurseID!),
                completed: entry.completed!,
            }));

        const allocations = allocationsData
            .map((obj: DataObject) => ({
                date: obj.getDateOrNull(PatientChangelogField.Date),
                employeeID: obj.getStringOrNull(PatientChangelogField.EmployeeID),
                nurseID: obj.getStringOrNull(PatientChangelogField.NurseID),
            }))
            .filter((entry) => entry.date && entry.employeeID && entry.nurseID)
            .map((entry) => ({
                date: entry.date!,
                employeeID: new EmployeeID(entry.employeeID!),
                nurseID: new EmployeeID(entry.nurseID!),
            }));

        const edits = editsData
            .map((obj: DataObject) => ({
                date: obj.getDateOrNull(PatientChangelogField.Date),
                nurseID: obj.getStringOrNull(PatientChangelogField.NurseID),
            }))
            .filter((entry) => entry.date && entry.nurseID)
            .map((entry) => ({
                date: entry.date!,
                nurseID: new EmployeeID(entry.nurseID!),
            }));

        return new PatientChangelog(creationDate, eventCreations, eventCompletions, allocations, edits);
    }
}

export default PatientChangelogDataObject;
