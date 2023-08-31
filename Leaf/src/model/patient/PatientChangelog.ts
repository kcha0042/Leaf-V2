import UUID from "../core/UUID";
import EmployeeID from "../employee/EmployeeID";
import ChangelogPoint from "./ChangelogPoint";
import Patient from "./Patient";

class PatientChangelog {
    private _creationDate: Date;
    private _eventCreations: { date: Date; eventID: UUID; nurseID: EmployeeID }[];
    private _eventCompletions: { date: Date; eventID: UUID; nurseID: EmployeeID }[];
    private _allocations: { date: Date; employeeID: EmployeeID; nurseID: EmployeeID }[];
    private _edits: { date: Date; nurseID: EmployeeID }[];
    get creationDate(): Date {
        return this._creationDate;
    }
    get eventCreations(): { date: Date; eventID: UUID; nurseID: EmployeeID }[] {
        return this._eventCreations;
    }
    get eventCompletions(): { date: Date; eventID: UUID; nurseID: EmployeeID }[] {
        return this._eventCompletions;
    }
    get allocations(): { date: Date; employeeID: EmployeeID; nurseID: EmployeeID }[] {
        return this._allocations;
    }
    get edits(): { date: Date; nurseID: EmployeeID }[] {
        return this._edits;
    }

    constructor(
        creationDate: Date,
        eventCreations: { date: Date; eventID: UUID; nurseID: EmployeeID }[],
        eventCompletions: { date: Date; eventID: UUID; nurseID: EmployeeID }[],
        allocations: { date: Date; employeeID: EmployeeID; nurseID: EmployeeID }[],
        edits: { date: Date; nurseID: EmployeeID }[],
    ) {
        this._creationDate = creationDate;
        this._eventCreations = eventCreations;
        this._eventCompletions = eventCompletions;
        this._allocations = allocations;
        this._edits = edits;
    }

    public static new() {
        return new PatientChangelog(new Date(), [], [], [], []);
    }

    public logEventCreation(eventID: UUID, nurseID: EmployeeID) {
        this.eventCreations.push({ date: new Date(), eventID: eventID, nurseID: nurseID });
    }

    public logEventCompletion(eventID: UUID, nurseID: EmployeeID) {
        this._eventCompletions.push({ date: new Date(), eventID: eventID, nurseID: nurseID });
    }

    public logAllocation(employeeID: EmployeeID, nurseID: EmployeeID) {
        this._allocations.push({ date: new Date(), employeeID: employeeID, nurseID: nurseID });
    }

    public logEdit(nurseID: EmployeeID) {
        this._edits.push({ date: new Date(), nurseID: nurseID });
    }

    public generateTimeline(): ChangelogPoint[] {
        const allPoints: ChangelogPoint[] = [
            this.generateCreationDatePoint(),
            ...this.generateEventCreationsPoints(),
            ...this.generateEventCompletionsPoints(),
            ...this.generateAllocationsPoints(),
            ...this.generateEditsPoints(),
        ];
        // Sort the array by date from earliest to latest
        allPoints.sort((a, b) => a.date.getTime() - b.date.getTime());
        return allPoints;
    }

    private generateCreationDatePoint(): ChangelogPoint {
        return ChangelogPoint.new(this._creationDate, `Entered system`);
    }

    private generateEventCreationsPoints(): ChangelogPoint[] {
        return this._eventCreations.map((eventCreation) =>
            ChangelogPoint.new(
                eventCreation.date,
                `Event ${eventCreation.eventID.toString()} created by ${eventCreation.nurseID.toString()}`,
            ),
        );
    }

    private generateEventCompletionsPoints(): ChangelogPoint[] {
        return this._eventCompletions.map((eventCompletion) =>
            ChangelogPoint.new(
                eventCompletion.date,
                `Event ${eventCompletion.eventID.toString()} completed by ${eventCompletion.nurseID.toString()}`,
            ),
        );
    }

    private generateAllocationsPoints(): ChangelogPoint[] {
        return this._allocations.map((allocation) =>
            ChangelogPoint.new(
                allocation.date,
                `Allocation by ${allocation.employeeID.toString()} to nurse ${allocation.nurseID.toString()}`,
            ),
        );
    }

    private generateEditsPoints(): ChangelogPoint[] {
        return this._edits.map((edit) => ChangelogPoint.new(edit.date, `Record edited by ${edit.nurseID.toString()}`));
    }
}

export default PatientChangelog;
